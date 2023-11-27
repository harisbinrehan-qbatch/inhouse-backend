import NotificationModel from '../../models/notification';
import catchResponse from '../../utils/catch-response';

const placeNotification = async (req, res) => {
  try {
    const { userId, text } = req.body;

    const newNotification = new NotificationModel({
      userId,
      text,
      isRead: false,
    });

    const savedNotification = await newNotification.save();

    res.status(201).json(savedNotification);
  } catch (error) {
    error.statusCode = 500;
    catchResponse({ res, err: error });
  }
};

export default placeNotification;
