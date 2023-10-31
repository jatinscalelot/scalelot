var express = require('express');
var router = express.Router();
const Sib = require('sib-api-v3-sdk');
const client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;
const mongoConnection = require('../utilities/connections');
const responseManager = require('../utilities/response.manager');
const constants = require('../utilities/constants');
const careerModel = require('../models/careers.model');
router.get('/', async (req, res) => {
  res.render('career', { title: 'Scalelot - Treat With Technologies' });
});
router.post('/', async (req, res) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const { selectedPosition, first_name, middle_name, last_name, email, phone, contrycode, city, experience, position, joining, message, cv, portfolio } = req.body;
  if (selectedPosition && selectedPosition != '') {
    if (first_name && first_name != '') {
      if (middle_name && middle_name != '') {
        if (last_name && last_name != '') {
          if (email && email != '' && (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            if (phone && phone != '' && phone.length >= 9) {
              if (contrycode && contrycode != '') {
                if (city && city != '') {
                  if (experience && experience != '') {
                    if (position && position != '') {
                      if (joining && joining != '') {
                        if (message && message != '') {
                          if (cv && cv != '') {
                            let primary = mongoConnection.useDb(constants.DEFAULT_DB);
                            var obj = {
                              selectedPosition : selectedPosition,
                              first_name : first_name,
                              middle_name : middle_name,
                              last_name : last_name,
                              email : email,
                              phone : phone,
                              contrycode : contrycode,
                              city : city,
                              experience : experience,
                              position : position,
                              joining : joining,
                              message : message,
                              cv : cv,
                              portfolio : portfolio
                            };
                            let checkExisting = await primary.model(constants.MODELS.careers, careerModel).findOne({ email: email }).lean();
                            if(checkExisting == null){
                              await primary.model(constants.MODELS.careers, careerModel).create(obj);
                              return responseManager.onSuccess('Your Application has been saved successfully. You will get call & email from our executive for the interview, Stay tune...', 1, res);
                            }else{
                              return responseManager.onSuccess('User already send the application with same email, Please try again...', 0, res);
                            }
                          } else {
                            return responseManager.badrequest({ message: 'CV is mandatory, Please upload valid file and try again...' }, res);
                          }
                        } else {
                          return responseManager.badrequest({ message: 'Message field is mandatory, Please write something about you and try again...' }, res);
                        }
                      } else {
                        return responseManager.badrequest({ message: 'Joining time is mandatory, Please select valid option and try again...' }, res);
                      }
                    } else {
                      return responseManager.badrequest({ message: 'Experties level is mandatory, Please select valid option and try again...' }, res);
                    }
                  } else {
                    return responseManager.badrequest({ message: 'Experience level is mandatory, Please select valid option and try again...' }, res);
                  }
                } else {
                  return responseManager.badrequest({ message: 'City is mandatory, Please write city name where you leave and try again...' }, res);
                }
              } else {
                return responseManager.badrequest({ message: 'Contry-code is mandatory, Please select your contry of origin and try again...' }, res);
              }
            } else {
              return responseManager.badrequest({ message: 'Contact Number is mandatory and must be valid, Please write your contact number and try again...' }, res);
            }
          } else {
            return responseManager.badrequest({ message: 'Email is mandatory and must be valid, Please write your valid email-id and try again...' }, res);
          }
        } else {
          return responseManager.badrequest({ message: 'Last name is mandatory, Please write your last name and try again...' }, res);
        }
      } else {
        return responseManager.badrequest({ message: 'Middle name is mandatory, Please write your middle name and try again...' }, res);
      }
    } else {
      return responseManager.badrequest({ message: 'First name is mandatory, Please write your first name and try again...' }, res);
    }
  } else {
    return responseManager.badrequest({ message: 'Invalid career position data to request, Please try again with valid career position....' }, res);
  }
});
module.exports = router;
