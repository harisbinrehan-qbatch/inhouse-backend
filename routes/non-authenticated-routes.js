import express from 'express';

import ScriptMethods from '../script-methods';
import { StripeActions } from '../controllers/stripe';

const router = express.Router();

router.get('/script', async (req, res) => {
  try {
    const { query } = req;
    const { method, ...rest } = query;

    await ScriptMethods({
      method,
      ...rest,
    });

    res.send('OK');
  } catch (error) {
    res.send(error.message);
  }
});

router.post('/webhook', StripeActions);

export default router;
