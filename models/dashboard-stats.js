import mongoose from 'mongoose';

const dashboardStatSchema = mongoose.Schema(
  {
    todayStats: {
      type: Object,
    },
    sevenDayStats: {
      type: Object,
    },
    thirtyDayStats: {
      type: Object,
    },
    oneYearStats: {
      type: Object,
    },
    totalPaidOrders: {
      type: Number,
    },
    totalUnpaidOrders: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const DashboardStats = mongoose.model('DashboardStats', dashboardStatSchema);

export default DashboardStats;
