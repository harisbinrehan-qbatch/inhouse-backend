
import express from 'express';
import { getNotifications, readNotification } from '../controllers/notifications';

const router = express.Router();

router.get('/getNotifications', getNotifications);
router.put('/readNotification', readNotification);


export default router;