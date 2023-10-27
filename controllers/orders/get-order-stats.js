import DashboardStat from '../../models/dashboard-stats';

const GetOrderStats = async (req, res) => {
  try {
    const statistics = await DashboardStat.find();
    
    res.status(200).json({ data: statistics });
  } catch (error) {
    console.error('Error retrieving statistics', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default GetOrderStats;
