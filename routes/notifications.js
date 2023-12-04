
import express from 'express';
import passport from 'passport';
import { GetNotifications, ReadNotification } from '../controllers/notifications';
const router = express.Router();

router.get(
  '/getNotifications',
  passport.authenticate('jwt', { session: false }),
  GetNotifications
);
router.put(
  '/readNotification',
  passport.authenticate('jwt', { session: false }),
  ReadNotification
);

export default router;