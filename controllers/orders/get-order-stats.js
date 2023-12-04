import DashboardStat from '../../models/dashboard-stats';

const GetOrderStats = async (req, res) => {
  try {
    const statistics = await DashboardStat.find();

    res.status(200).json({ data: statistics });
  } catch (err) {
    res
      .status(500)
      .json({ message: `Oops! An internal server error occurred. ${err.message}` });
  }
};

export default GetOrderStats;
