import express from 'express';

import ScriptMethods from '../script-methods';
import userModel from '../models/user';

const Router = express.Router();

Router.get('/script', async (req, res) => {
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

Router.post('/webhook', async (req, res) => {
  try {
    if(req.body.type === 'customer.created') {
      const {email, id }= req.body.data.object;
      await userModel.updateOne({email}, {$set: {stripeId: id}});

    }
    else if(req.body.type === 'charge.succeeded') {
      console.log('In Webhook', req.body.data.object.metadata);
    }
  } catch (error) {
    res.send(error.message);
  }
});

export default Router;
