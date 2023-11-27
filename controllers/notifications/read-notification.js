const mongoose = require('mongoose');

import NotificationModel from '../../models/notification';
import catchResponse from '../../utils/catch-response';

const readNotification = async (req, res) => {
  try {
    const { notificationId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(notificationId)) {
      return res.status(400).json({ error: 'Invalid notificationId' });
    }

    const updatedNotification = await NotificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    error.statusCode = 500;
    catchResponse({ res, err: error });
  }
};

export default readNotification;
