import NotificationModel from '../../models/notification';

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
  } catch (err) {
    res.status(500).json({
      message: `Oops! An internal server error occurred. ${err.message}`,
    });
  }
};

export default placeNotification;
