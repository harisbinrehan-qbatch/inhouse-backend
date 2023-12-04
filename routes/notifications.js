
import express from 'express';
import passport from 'passport';

import { getNotifications, readNotification } from '../controllers/notifications';

const router = express.Router();

router.get(
  '/getNotifications',
  passport.authenticate('jwt', { session: false }),
  getNotifications
);
router.put(
  '/readNotification',
  passport.authenticate('jwt', { session: false }),
  readNotification
);

export default router;