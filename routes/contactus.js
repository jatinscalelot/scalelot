var express = require('express');
var router = express.Router();
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;
const mongoConnection = require('../utilities/connections');
const responseManager = require('../utilities/response.manager');
const constants = require('../utilities/constants');
const contactsModel = require('../models/contacts.model');
router.get('/', function (req, res, next) {
  res.render('contactus', { title: 'Scalelot - Treat With Technologies' });
});
router.post('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { name, email, phone, contrycode,  subject, message } = req.body;
  if (name && name.trim() != '' && email && email.trim() != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let checkExisting = await primary.model(constants.MODELS.contacts, contactsModel).findOne({ email: email }).lean();
    if (checkExisting == null) {
      let obj = {
        name: name,
        email : email,
        phone : phone,
        contrycode : contrycode,
        subject : subject,
        message : message
      };
      await primary.model(constants.MODELS.contacts, contactsModel).create(obj);
      const tranEmailApi = new Sib.TransactionalEmailsApi()
      const sender = {
        email: email,
        name: name
      }
      const receivers = [
        {
          email: process.env.SIB_EMAIL_ID,
          name: 'Scalelot Technologies'
        },
      ];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: name + ' - Contacted - for - ' + subject + ' - Service',
        htmlContent: `<h3>` + name + `</h3><br/><h5>` + email + `</h5><br/><h5>` + contrycode+phone + `</h5><br/><h5>` + message + `</h5>`,
      }).then((response) => {
        console.log('success', response);
        return responseManager.onSuccess('Thank you for getting in touch. we will reply by email as soon as possible.', 1, res);
      }).catch((error) => {
        console.log('error', error);
        return responseManager.onError(error, res);
      });
    } else {
      return responseManager.onSuccess('User already send the contact-us request with same email, Please try again...', 0, res);
    }
  } else {
    return responseManager.badrequest({ message: 'Invalid data to send contact-us request, please try again' }, res);
  }
});
module.exports = router;
