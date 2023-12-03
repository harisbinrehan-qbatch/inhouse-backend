const mongoose = require('mongoose');

import NotificationModel from '../../models/notification';

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
      return res.status(404).json({ message: 'Notification not found' });
    }

    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({
      message: `Internal Server Error: Oops! An internal server error occurred. ${err.message}`,
    });
  }
};

export default readNotification;
