import moment from 'moment';
import Agenda from '../config';
import { JOB_STATES } from '../utils';

import DashboardStats from '../../models/dashboard-stats';
import OrderSchema from '../../models/order';
import ProductSchema from '../../models/product';

Agenda.define(
  'create-dashboard-stats',
  { concurrency: 1 },
  async (job, done) => {
    job.attrs.state = JOB_STATES.STARTED;
    job.attrs.progress = 0;
    await job.save();

    try {
      job.attrs.state = JOB_STATES.IN_PROGRESS;
      job.attrs.progress = 25;
      await job.save();

      const totalPaidOrders = await OrderSchema.aggregate([
        {$match: {isPaid: true}},
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ]);

      const totalUnpaidOrders = await OrderSchema.aggregate([
        {$match: {isPaid: false}},
        {
          $group: {
            _id: null,
            count: { $sum: 1 }
          }
        }
      ]);

      const topSellingProducts = await ProductSchema.aggregate([
        {$sort: { sold: -1 }},
        {$limit: 10}
      ]);

      const calculateOneYearStats = async () => {
        const oneYearStats = [];

        for (let i = 0; i < 12; i++) {
          const startOfMonth = moment()
            .subtract(i, 'months')
            .startOf('month')
            .toDate();
          const endOfMonth = moment()
            .subtract(i, 'months')
            .endOf('month')
            .toDate();

          const monthlyStats = await OrderSchema.aggregate([
            {$match: {date: { $gte: startOfMonth, $lte: endOfMonth }}},
            {
              $group: {
                _id: null,
                totalOrders: {$sum: 1},
                totalSales: {$sum:  '$total' }
              }
            }
          ]);

          oneYearStats.push({
            month: moment(startOfMonth).format('MMM'),
            totalOrders: monthlyStats[0]?.totalOrders || 0,
            totalSales: monthlyStats[0]?.totalSales || 0
          });
        }

        return oneYearStats;
      };

      const oneYearStats = await calculateOneYearStats();

      job.attrs.progress = 50;
      await job.save();

      let startDate = moment().startOf('day').toDate();
      let endDate = moment().endOf('day').toDate();
      const todayStats = await OrderSchema.aggregate([
        {$match: {date: { $gte: startDate, $lte: endDate }}},
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalUnits: { $sum: '$totalProducts'  },
            totalSales: { $sum: '$total'  }
          }
        }
      ]);

      job.attrs.progress = 50;
      await job.save();

      startDate = moment().subtract(7, 'days').toDate();
      endDate = moment().toDate();
      const sevenDayStats = await OrderSchema.aggregate([
        {$match: {date: { $gte: startDate, $lte: endDate }}},
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalUnits: { $sum: '$totalProducts'  },
            totalSales: { $sum:  '$total'  }
          }
        }
      ]);

      job.attrs.progress = 75;
      await job.save();

      startDate = moment().subtract(30, 'days').toDate();
      endDate = moment().toDate();
      const thirtyDayStats = await OrderSchema.aggregate([
        {$match: {date: { $gte: startDate, $lte: endDate }}},
        {
          $group: {
            _id: null,
            totalOrders: { $sum: 1 },
            totalUnits: { $sum:  '$totalProducts'  },
            totalSales: { $sum: '$total' }
          }
        }
      ]);

      job.attrs.lockedAt = null;
      job.attrs.state = JOB_STATES.COMPLETED;
      job.attrs.progress = 100;
      await job.save();

      await DashboardStats.updateOne(
        {_id: '6544e40a11a33d8ec197c7b9'},
        {
          $set: {
            totalPaidOrders: totalPaidOrders[0]?.count || 0,
            totalUnpaidOrders: totalUnpaidOrders[0]?.count || 0,
            todayStats: todayStats[0],
            sevenDayStats: sevenDayStats[0],
            thirtyDayStats: thirtyDayStats[0],
            oneYearStats,
            topSelling: topSellingProducts
          }
        },
        {upsert: true}
      );

    } catch (error) {
      job.attrs.state = JOB_STATES.FAILED;
      job.attrs.failedAt = new Date();
      job.attrs.failReason = error.message;

      await job.save();
    }

    done();
  }
);
