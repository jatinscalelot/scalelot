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
  const { name, phone, email, subject, description } = req.body;
  if (name && name.trim() != '' && email && email.trim() != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && company_name && company_name.trim() != '' && description && description.trim() != '') {
    let primary = mongoConnection.useDb(constants.DEFAULT_DB);
    let checkExisting = await primary.model(constants.MODELS.getintouches, getintouchModel).findOne({ email: email }).lean();
    if (checkExisting == null) {
      let obj = {
        name: name,
        email: email,
        company_name: company_name,
        description: description,
      };
      await primary.model(constants.MODELS.getintouches, getintouchModel).create(obj);
      const tranEmailApi = new Sib.TransactionalEmailsApi()
      const sender = {
        email: email,
        name: name
      }
      const receivers = [
        {
          email: process.env.SIB_EMAIL_ID,
          name: 'Festum Evento'
        },
      ];
      tranEmailApi.sendTransacEmail({
        sender,
        to: receivers,
        subject: name + ' Query ' + company_name,
        htmlContent: `<h3>` + company_name + `</h3><br/><h5>` + description + `</h5>`,
      }).then((response) => {
        console.log('success', response);
        return responseManager.onSuccess('Thank you for getting in touch. we will reply by email as soon as possible.', 1, res);
      }).catch((error) => {
        console.log('error', error);
        return responseManager.onError(error, res);
      });
    } else {
      return responseManager.badrequest({ message: 'User already send to query with same email, Please try again...' }, res);
    }
  } else {
    return responseManager.badrequest({ message: 'Invalid data to send query, please try again' }, res);
  }
});
module.exports = router;