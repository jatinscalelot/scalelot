var express = require('express');
var router = express.Router();
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;
const mongoConnection = require('../utilities/connections');
const responseManager = require('../utilities/response.manager');
const constants = require('../utilities/constants');
const subscriberModel = require('../models/subscribers.model');
router.get('/', async (req, res) => {
  res.render('aboutus', { title: 'Scalelot - Treat With Technologies' });
});
router.post('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { email } = req.body;
  if (email && email.trim() != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let checkExisting = await primary.model(constants.MODELS.subscribers, subscriberModel).findOne({ email: email }).lean();
    if (checkExisting == null) {
      let obj = {
        email : email,
        timestamp : Date.now()
      };
      await primary.model(constants.MODELS.subscribers, subscriberModel).create(obj);
      const tranEmailApi = new Sib.TransactionalEmailsApi()
      const sender = {
        email: process.env.SIB_EMAIL_ID,
        name: 'Scalelot Technologies'
      }
      const receivers = [
        {
          email: email,
          name: 'New Subscriber'
        },
      ];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: 'Welcome, This is confirmation mail for your subscription - Scalelot Technologies',
        htmlContent: ``,
      }).then((response) => {
        return responseManager.onSuccess('Thank you for new subscription. now you will get all latest updates from Scalelot Technologies.', 1, res);
      }).catch((error) => {
        return responseManager.onError(error, res);
      });
    } else {
      return responseManager.onSuccess('User already have subscription with same email, Please try again...', 0, res);
    }
  } else {
    return responseManager.badrequest({ message: 'Invalid data to for new subscription, please try again' }, res);
  }
});
module.exports = router;
