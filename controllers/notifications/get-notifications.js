import NotificationModel from '../../models/notification';
import catchResponse from '../../utils/catch-response';

const getNotifications = async (req, res) => {
  try {
    const notifications = await NotificationModel.find();

    if (notifications.length === 0) {
      return res.status(404).json({ error: 'No notifications found' });
    }

    res.status(200).json(notifications);

  } catch (error) {
    error.statusCode = 500;
    catchResponse({ res, err: error });
  }
};

export default getNotifications;
