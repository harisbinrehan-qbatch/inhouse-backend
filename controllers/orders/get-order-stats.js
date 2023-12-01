import DashboardStat from '../../models/dashboard-stats';

const GetOrderStats = async (req, res) => {
  try {
    const statistics = await DashboardStat.find();
    
    res.status(200).json({ data: statistics });
  } catch (error) {
    console.log('Error retrieving statistics', error);
    res.status(400).json({ error: 'Internal Server Error' });
  }
};

export default GetOrderStats;
