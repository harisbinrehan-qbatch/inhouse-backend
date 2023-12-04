import NotificationModel from '../../models/notification';

const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find();

    if (notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found' });
    }

    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({
      message: `Oops! An internal server error occurred. ${err.message}`,
    });
  }
};

export default getNotifications;
