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
                              selectedPosition: selectedPosition,
                              first_name: first_name,
                              middle_name: middle_name,
                              last_name: last_name,
                              email: email,
                              phone: phone,
                              contrycode: contrycode,
                              city: city,
                              experience: experience,
                              position: position,
                              joining: joining,
                              message: message,
                              cv: cv,
                              portfolio: portfolio
                            };
                            let checkExisting = await primary.model(constants.MODELS.careers, careerModel).findOne({ email: email }).lean();
                            if (checkExisting == null) {
                              await primary.model(constants.MODELS.careers, careerModel).create(obj);
                              const tranEmailApi = new Sib.TransactionalEmailsApi()
                              const sender = {
                                email: email,
                                name: first_name + ' ' + middle_name + ' ' + last_name
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
                                subject: 'Application for the Post - '+selectedPosition,
                                htmlContent: `<!DOCTYPE html>
                                <html lang="en">
                                   <head>
                                      <title></title>
                                      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                                      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
                                      <style>
                                        @font-face {
                                            font-family: 'Helvetica Neue';
                                            src: url('HelveticaNeue-MediumExt.eot');
                                            src: url('HelveticaNeue-MediumExt.eot?#iefix') format('embedded-opentype'),
                                               url('HelveticaNeue-MediumExt.woff2') format('woff2'),
                                               url('HelveticaNeue-MediumExt.woff') format('woff'),
                                               url('HelveticaNeue-MediumExt.ttf') format('truetype');
                                            font-weight: 500;
                                            font-style: normal;
                                            font-display: swap;
                                         }
                                         @font-face {
                                            font-family: 'GE Dinar One';
                                            src: url('GEDinarOne-Medium.eot');
                                            src: url('GEDinarOne-Medium.eot?#iefix') format('embedded-opentype'),
                                               url('GEDinarOne-Medium.woff2') format('woff2'),
                                               url('GEDinarOne-Medium.woff') format('woff'),
                                               url('GEDinarOne-Medium.ttf') format('truetype');
                                            font-weight: 500;
                                            font-style: normal;
                                            font-display: swap;
                                         }
                                         * {
                                         box-sizing: border-box;
                                         line-height: 1.6;
                                         }
                                         body {
                                         margin: 0;
                                         padding: 0;
                                         font-family: 'Poppins', sans-serif;
                                         }
                                         img{
                                            max-width: 100%;
                                            height: auto;
                                         }
                                         table{
                                            border-collapse: collapse;
                                         }
                                      </style>
                                   </head>
                                   <body style="background-color: transparent; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
                                      <table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
                                         style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: transparent;" width="100%">
                                         <tbody>
                                            <tr>
                                               <td>
                                                  <table border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                                                     <tbody>
                                                        <tr>
                                                           <td>
                                                              <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack" 
                                                                 role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-radius: 0; color: #fff; width: 595px; background: #022D62;">
                                                                 <tbody style="padding: 25px;">
                                                                    <tr>
                                                                       <td style="padding:20px 40px; font-weight: 500; text-align: center; vertical-align: top; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                                                          <span style="display: inline-block; width: 100%; max-width: 260px;">
                                                                             <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 613 131.3" style="enable-background:new 0 0 613 131.3;" xml:space="preserve">
                                                                                <style type="text/css">
                                                                                   .st0{fill:#FFFFFF;}
                                                                                   .st1{fill:#EF3238;}
                                                                                </style>
                                                                                <g>
                                                                                   <g>
                                                                                      <path class="st0" d="M453.3,14.7h-8.5v8.5h8.5V14.7z"></path>
                                                                                      <path class="st0" d="M478.8,20.9h-8.5v8.5h8.5V20.9z"></path>
                                                                                      <path class="st0" d="M441,20.9h-8.5v8.5h8.5V20.9z"></path>
                                                                                      <path class="st0" d="M427.1,0h-7.7v8.5h7.7V0z"></path>
                                                                                      <path class="st0" d="M414.7,20.9h-8.5v8.5h8.5V20.9z"></path>
                                                                                      <path class="st0" d="M399.2,0h-7.7v8.5h7.7V0z"></path>
                                                                                      <path class="st0" d="M386.9,14.7h-7.7v8.5h7.7V14.7z"></path>
                                                                                      <path class="st0" d="M374.5,20.9H366v8.5h8.5V20.9z"></path>
                                                                                      <path class="st1" d="M374.5,9.3H366V17h8.5V9.3z"></path>
                                                                                      <path class="st1" d="M414.7,9.3h-8.5V17h8.5V9.3z"></path>
                                                                                      <path class="st1" d="M399.2,14.7h-7.7v8.5h7.7V14.7z"></path>
                                                                                      <path class="st1" d="M427.1,14.7h-7.7v8.5h7.7V14.7z"></path>
                                                                                      <path class="st1" d="M441,9.3h-8.5V17h8.5V9.3z"></path>
                                                                                      <path class="st1" d="M466.4,14.7h-9.3v8.5h9.3V14.7z"></path>
                                                                                      <path class="st1" d="M478.8,9.3h-8.5V17h8.5V9.3z"></path>
                                                                                   </g>
                                                                                   <g>
                                                                                      <path class="st0" d="M161.3,44.9h-6.6c-3.1,0-6.3,0.1-9.7,0.3c-3.4,0.2-6.1,1.1-8.2,2.6c-0.9,0.6-1.7,1.3-2.3,2.2
                                                                                         c-0.6,0.9-1,1.9-1.2,2.9c-1,4.5-1,9.2,0,13.7c0.2,1.1,0.6,2.1,1.2,2.9c0.6,0.9,1.4,1.6,2.3,2.2c2.1,1.5,4.9,2.3,8.2,2.5
                                                                                         c3.4,0.2,6.6,0.3,9.7,0.3h6.6c2.3,0,4.6,0,7,0.1c2.4,0,4.8,0.2,7.1,0.6c2.2,0.3,4.4,0.8,6.5,1.5c1.9,0.6,3.7,1.5,5.3,2.6
                                                                                         c1.4,1.1,2.6,2.4,3.5,4c0.9,1.5,1.5,3.2,1.9,4.9c0.4,1.8,0.7,3.7,0.7,5.5c0.1,1.9,0.1,3.8,0.1,5.7c0,1.8,0,3.7-0.1,5.7
                                                                                         c-0.1,1.9-0.3,3.7-0.7,5.6c-0.4,1.7-1,3.4-1.9,4.9c-0.9,1.5-2.1,2.9-3.5,4c-1.6,1.2-3.4,2.2-5.3,2.8c-2.1,0.7-4.3,1.1-6.5,1.4
                                                                                         c-2.4,0.3-4.7,0.4-7.1,0.5c-2.4,0-4.8,0.1-7,0.1h-6.6c-2.3,0-4.6,0-7.1-0.1c-2.4-0.1-4.8-0.2-7.1-0.5c-2.2-0.3-4.4-0.7-6.6-1.4
                                                                                         c-1.9-0.6-3.7-1.5-5.3-2.8c-1.3-1-2.4-2.4-3.1-3.9c-1-2-1.4-4.2-1.4-6.4h11.5c0.7,1.3,1.7,2.4,3,3c1.5,0.7,3,1.2,4.7,1.5
                                                                                         c1.8,0.3,3.7,0.4,5.5,0.5c2,0,3.9,0.1,5.8,0.1h6.6c3.2,0,6.5-0.1,9.8-0.4c2.9-0.1,5.7-1,8.1-2.6c1.8-1.2,3.1-3,3.6-5.2
                                                                                         c1.1-4.5,1.1-9.2,0-13.6c-0.5-2.1-1.8-4-3.6-5.1c-2.4-1.6-5.3-2.4-8.1-2.5c-3.3-0.2-6.6-0.3-9.8-0.3h-6.6c-2.3,0-4.6,0-7-0.1
                                                                                         c-2.4,0-4.8-0.2-7.1-0.6c-2.2-0.3-4.4-0.8-6.6-1.5c-1.9-0.6-3.7-1.5-5.3-2.6c-1.4-1.1-2.6-2.4-3.4-4c-0.8-1.6-1.4-3.2-1.8-4.9
                                                                                         c-0.4-1.8-0.7-3.7-0.8-5.6c-0.1-1.9-0.1-3.9-0.1-5.7c0-1.9,0-3.8,0.1-5.7c0.1-1.9,0.3-3.8,0.8-5.6c0.4-1.7,1-3.4,1.8-4.9
                                                                                         c0.9-1.6,2-2.9,3.4-4c1.6-1.3,3.4-2.2,5.3-2.8c2.1-0.7,4.3-1.1,6.6-1.4c2.4-0.3,4.7-0.4,7.1-0.5c2.4,0,4.8-0.1,7-0.1h6.6
                                                                                         c2.3,0,4.6,0,7,0.1c2.4,0.1,4.8,0.2,7.1,0.5c2.2,0.3,4.4,0.7,6.5,1.4c1.9,0.6,3.7,1.6,5.3,2.8c1.5,1.1,2.6,2.6,3.4,4.3
                                                                                         c1,1.9,1.5,4.1,1.5,6.3h-11.4c-0.6-1.3-1.6-2.4-2.9-3.1c-1.5-0.8-3.1-1.3-4.8-1.6c-1.9-0.3-3.9-0.5-5.9-0.6L161.3,44.9z"></path>
                                                                                      <path class="st0" d="M274.4,118.3c-1.5,1.5-3.3,2.7-5.3,3.5c-2.1,0.8-4.3,1.5-6.5,1.8c-2.4,0.4-4.7,0.6-7.1,0.6
                                                                                         c-2.5,0-4.8,0.1-7.1,0.1h-6.6c-2.3,0-4.6,0-7.1-0.1c-2.4,0-4.7-0.2-7.1-0.6c-2.2-0.4-4.4-1-6.4-1.8c-4-1.6-7.1-4.7-8.8-8.6
                                                                                         c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7s0-4.7,0.1-7c0-2.3,0.3-4.6,0.6-6.9c0.4-2.2,1-4.3,1.8-6.3
                                                                                         c1.7-3.9,4.9-7,8.8-8.6c2.1-0.9,4.2-1.5,6.4-1.8c2.3-0.4,4.7-0.6,7.1-0.6c2.4,0,4.8-0.1,7.1-0.1h6.6c2.3,0,4.6,0,7.1,0.1
                                                                                         c2.4,0,4.8,0.3,7.1,0.6c2.2,0.3,4.4,1,6.5,1.8c2,0.8,3.8,2,5.3,3.5c1.8,1.8,3.2,4,3.9,6.5c0.8,2.5,1.3,5.1,1.7,7.7l-10.6,1.1
                                                                                         c-0.3-1.3-0.7-2.6-1.2-3.9c-0.5-1.2-1.3-2.3-2.3-3.2c-1-1-2.3-1.8-3.6-2.4c-1.4-0.6-2.9-1-4.4-1.3c-1.6-0.3-3.2-0.4-4.8-0.5
                                                                                         c-1.6,0-3.2-0.1-4.7-0.1h-6.7c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.7,0.5c-1.5,0.3-3,0.7-4.4,1.3c-1.4,0.5-2.6,1.3-3.6,2.4
                                                                                         c-2.1,2.1-3.4,4.8-3.6,7.7c-0.7,6.2-0.7,12.5,0,18.8c0.3,2.9,1.5,5.6,3.6,7.7c1,1,2.3,1.8,3.6,2.4c1.4,0.6,2.9,1,4.4,1.3
                                                                                         c1.6,0.3,3.1,0.4,4.7,0.5c1.6,0,3.2,0.1,4.8,0.1h6.6c1.5,0,3.1,0,4.7-0.1c1.6,0,3.2-0.2,4.8-0.5c1.5-0.3,3-0.7,4.4-1.3
                                                                                         c1.3-0.5,2.6-1.3,3.6-2.4c1-0.9,1.8-2,2.3-3.2c0.5-1.3,0.9-2.6,1.2-3.9l10.6,1.1c-0.4,2.6-0.9,5.2-1.7,7.7
                                                                                         C277.6,114.3,276.3,116.5,274.4,118.3z"></path>
                                                                                      <path class="st0" d="M341.8,124.3v-1.5c-2.8,0.8-5.8,1.2-8.7,1.4c-3.1,0.1-6.2,0.2-9.1,0.2h-5.3c-1.9,0-4,0-6.1-0.1
                                                                                         c-2.1-0.1-4.2-0.2-6.2-0.4c-1.9-0.2-3.8-0.6-5.7-1.1c-1.6-0.4-3.2-1.2-4.6-2.1c-1.2-0.8-2.1-1.8-2.9-3c-0.8-1.2-1.3-2.5-1.5-3.9
                                                                                         c-0.5-2.9-0.8-5.8-0.8-8.8c0-1.5,0-3,0.1-4.5c0.1-1.5,0.3-2.9,0.7-4.4c0.4-1.4,0.9-2.7,1.6-3.9c0.7-1.2,1.7-2.3,2.8-3.1
                                                                                         c1.4-1,3-1.7,4.6-2.2c1.9-0.5,3.8-0.9,5.7-1.1c2-0.2,4.1-0.4,6.2-0.4c2.1,0,4.2-0.1,6.1-0.1h5.2c2.9,0,6,0.1,9.1,0.2
                                                                                         c2.9,0.1,5.8,0.5,8.7,1.3v-1.5c0-2-0.2-4.1-0.5-6.1c-0.3-1.9-1.3-3.7-2.8-4.8c-1.9-1.4-4.2-2.2-6.6-2.3c-2.7-0.2-5.3-0.4-7.9-0.4
                                                                                         h-5.3c-2.6,0-5.2,0.1-7.9,0.3c-2.4,0.1-4.7,0.9-6.6,2.3c-0.5,0.4-1,0.8-1.4,1.4c-0.4,0.6-0.7,1.2-1,1.8l-10.6-1.7
                                                                                         c0.3-1.8,0.8-3.6,1.5-5.3c0.8-1.7,1.9-3.2,3.3-4.4c1.4-1.2,2.9-2,4.6-2.6c1.8-0.6,3.7-1.1,5.7-1.3c2-0.3,4.1-0.4,6.1-0.5
                                                                                         c2.1-0.1,4.2-0.1,6.2-0.1h5.2c2,0,4.1,0,6.2,0.1c2.1,0,4.1,0.2,6.1,0.5c1.9,0.3,3.8,0.7,5.6,1.3c1.7,0.5,3.3,1.4,4.6,2.6
                                                                                         c1.3,1.1,2.3,2.4,3,3.9c0.8,1.5,1.3,3.1,1.6,4.7c0.3,1.7,0.5,3.4,0.6,5.1c0,1.8,0.1,3.5,0.1,5.3v39.1L341.8,124.3z M318.8,95.4
                                                                                         c-2.5,0-5.1,0-7.8,0.1c-2.3,0-4.6,0.5-6.7,1.5c-1.3,0.7-2.2,1.9-2.6,3.3c-0.5,1.5-0.7,3-0.7,4.5c0,1.5,0.2,3,0.7,4.4
                                                                                         c0.4,1.4,1.4,2.5,2.6,3.2c2.1,1,4.4,1.6,6.7,1.6c2.7,0.1,5.3,0.2,7.8,0.2h5.2c2.5,0,5.1-0.1,7.8-0.2c2.3,0,4.6-0.6,6.7-1.6
                                                                                         c1.2-0.7,2.2-1.8,2.6-3.2c0.5-1.4,0.7-2.9,0.7-4.4c0-1.5-0.2-3.1-0.7-4.5c-0.4-1.4-1.4-2.6-2.6-3.3c-2.1-1-4.4-1.5-6.7-1.5
                                                                                         c-2.7-0.1-5.3-0.1-7.8-0.1H318.8z"></path>
                                                                                      <path class="st0" d="M373.6,37.8v86.5h-10V37.8H373.6z"></path>
                                                                                      <path class="st0" d="M442.9,108.3l10.7,2.9c-0.7,3.1-2.4,5.9-4.9,7.9c-1.5,1.3-3.3,2.3-5.2,3c-2.1,0.7-4.2,1.2-6.4,1.5
                                                                                         c-2.3,0.3-4.7,0.5-7,0.6c-2.4,0-4.7,0.1-7,0.1h-6.4c-2.3,0-4.7,0-7-0.1c-2.3,0-4.7-0.3-7-0.6c-2.2-0.4-4.3-1-6.4-1.8
                                                                                         c-3.9-1.6-7-4.7-8.7-8.6c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7s0-4.6,0.1-7c0-2.3,0.3-4.6,0.6-6.9
                                                                                         c0.3-2.2,0.9-4.3,1.8-6.3c1.7-3.9,4.8-7,8.7-8.6c2.1-0.9,4.2-1.5,6.4-1.8c2.3-0.4,4.6-0.6,7-0.6c2.4,0,4.7-0.1,7-0.1h6.4
                                                                                         c2.3,0,4.7,0,7,0.1c2.3,0,4.7,0.3,7,0.6c2.2,0.3,4.3,1,6.4,1.8c3.9,1.6,7,4.7,8.6,8.6c0.9,2,1.5,4.1,1.8,6.3
                                                                                         c0.4,2.3,0.6,4.6,0.6,6.9c0,2.4,0.1,4.7,0.1,7v5.1h-59.3c0.1,2.2,0.4,4.4,1,6.6c0.5,2,1.6,3.9,3.1,5.4c1,1,2.2,1.8,3.5,2.4
                                                                                         c1.4,0.6,2.8,1,4.3,1.3c1.6,0.3,3.1,0.4,4.7,0.5c1.6,0,3.2,0.1,4.8,0.1h6.4c1.9,0,3.9,0,6-0.1c1.9-0.1,3.8-0.3,5.7-0.7
                                                                                         c1.7-0.3,3.3-1,4.8-1.8C441,110.9,442.1,109.8,442.9,108.3z M440.5,75.9c-2.1-2.1-4.9-3.4-7.8-3.6c-3.2-0.4-6.3-0.6-9.5-0.6h-6.4
                                                                                         c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.7,0.5c-1.5,0.3-2.9,0.7-4.3,1.3c-1.3,0.5-2.5,1.3-3.5,2.4c-1.5,1.5-2.5,3.3-3.1,5.4
                                                                                         c-0.6,2.2-0.9,4.4-1,6.6h49.2c-0.1-2.2-0.4-4.4-1-6.6C443,79.3,442,77.4,440.5,75.9L440.5,75.9z"></path>
                                                                                      <path class="st0" d="M478.6,37.8v86.5h-10.8V37.8H478.6z"></path>
                                                                                      <path class="st0" d="M552.9,67.8c1.5,1.5,2.7,3.2,3.5,5.1c0.9,2,1.5,4.1,1.8,6.3c0.4,2.3,0.6,4.6,0.6,6.9c0,2.4,0.1,4.7,0.1,7
                                                                                         c0,2.3,0,4.6-0.1,7c0,2.3-0.2,4.6-0.6,6.9c-0.3,2.2-1,4.3-1.8,6.3c-1.7,3.9-4.8,7-8.8,8.6c-2.1,0.8-4.2,1.5-6.5,1.8
                                                                                         c-2.3,0.4-4.7,0.6-7,0.6c-2.4,0-4.8,0.1-7.1,0.1h-6.5c-2.3,0-4.7,0-7.1-0.1c-2.4,0-4.7-0.2-7-0.6c-2.2-0.4-4.4-1-6.5-1.8
                                                                                         c-3.9-1.6-7.1-4.7-8.8-8.6c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7c0-2.3,0-4.6,0.1-7
                                                                                         c0-2.3,0.3-4.6,0.6-6.9c0.4-2.2,1-4.3,1.8-6.3c1.7-3.9,4.8-7,8.8-8.6c2.1-0.9,4.2-1.5,6.5-1.8c2.3-0.4,4.7-0.6,7-0.6
                                                                                         c2.4,0,4.8-0.1,7.1-0.1h6.5c2.3,0,4.7,0,7.1,0.1c2.4,0,4.7,0.3,7,0.6c2.2,0.3,4.4,1,6.5,1.8C549.6,65.1,551.4,66.3,552.9,67.8
                                                                                         L552.9,67.8z M520.5,71.8c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.8,0.5c-1.5,0.3-2.9,0.7-4.3,1.3c-1.3,0.5-2.6,1.3-3.6,2.4
                                                                                         c-2.1,2.1-3.3,4.8-3.6,7.7c-0.6,6.2-0.6,12.5,0,18.8c0.2,2.9,1.5,5.6,3.6,7.7c1,1,2.2,1.8,3.6,2.4c1.4,0.6,2.9,1,4.3,1.3
                                                                                         c1.6,0.3,3.2,0.4,4.8,0.5c1.6,0,3.2,0.1,4.8,0.1h6.5c1.6,0,3.2,0,4.8-0.1c1.6,0,3.2-0.2,4.8-0.5c1.5-0.3,2.9-0.7,4.3-1.3
                                                                                         c1.3-0.5,2.6-1.3,3.6-2.4c2.1-2.1,3.4-4.8,3.6-7.7c0.7-6.2,0.7-12.5,0-18.8c-0.3-2.9-1.6-5.7-3.7-7.8c-2.1-2.1-4.9-3.3-7.9-3.6
                                                                                         c-3.2-0.4-6.4-0.6-9.6-0.6H520.5z"></path>
                                                                                      <path class="st0" d="M586.3,61.7V37.8h10.3v23.8H613v10h-16.4v52.6h-10.3V71.7h-16.6v-10H586.3z"></path>
                                                                                   </g>
                                                                                   <g>
                                                                                      <path class="st0" d="M31.9,30.1h7c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.2,0.1,0.2,0.2c0.8,1.4,1.6,2.8,2.3,4.2
                                                                                         c0.1,0.2,0.2,0.4,0.4,0.5c0.2,0.1,0.4,0.2,0.6,0.1c15.7,0,31.4,0,47.1,0c1.8,0,3.7,0.4,5.3,1.1c2.4,1,4.5,2.5,6.3,4.4
                                                                                         c1.8,1.9,3.2,4.1,4.1,6.5c0.2,0.4,0.1,0.6-0.3,0.8c-7.1,3.4-14.2,6.8-21.3,10.2L56.8,71.3c-0.2,0.1-0.4,0.2-0.6,0.3
                                                                                         c0.2,0.1,0.3,0.3,0.5,0.4c9,6.4,18.5,12.2,27.7,18.2c4.3,2.8,8.6,5.6,13,8.3c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.1,0.4,0.1,0.6
                                                                                         c-0.6,6.6-3.4,12.1-7.7,17c-3.4,3.8-7.6,6.6-12.2,8.9c-0.4,0.2-0.5-0.1-0.6-0.3c-3-6.3-6.1-12.6-9.1-19c-12-25.1-24-50.3-36-75.4
                                                                                         C32.1,30.6,32.1,30.4,31.9,30.1z"></path>
                                                                                      <path class="st0" d="M52.8,94.4c-1.3-0.9-2.5-1.7-3.8-2.5C36.5,84.4,24,77,11.5,69.6c-0.2-0.1-0.3-0.2-0.4-0.3
                                                                                         c-0.1-0.1-0.1-0.3-0.1-0.5c0.5-5.7,1.7-11.2,3.6-16.5c1.2-3.3,2.9-6.4,5.1-9.1c2.7-3.2,6.1-5.4,10.3-6.1c1.2-0.2,1.2-0.2,1.7,0.9
                                                                                         c10.8,23,21.6,46.1,32.4,69.1c3.6,7.7,7.2,15.4,10.8,23.1c0.1,0.2,0.2,0.4,0.3,0.6l-3.9,0.3c-0.8,0.1-1.6,0.1-2.3,0.2
                                                                                         c-0.1,0-0.3,0-0.4,0c-0.1-0.1-0.2-0.2-0.3-0.3c-0.8-1.6-1.6-3.2-2.4-4.8c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.3-0.1-0.4-0.1h-63
                                                                                         c-0.5,0-1,0-1.6,0c-0.5,0-0.6-0.2-0.7-0.6c-0.1-0.6,0-1.2,0.3-1.8c0.3-0.6,0.6-1,1.1-1.4l50.7-27.3C52.4,94.6,52.5,94.5,52.8,94.4
                                                                                         z"></path>
                                                                                      <path class="st1" d="M3.2,109.1c0.2-1.1,0.4-2,0.6-3c1.6-7.8,3.3-15.6,4.9-23.3c0.1-0.3,0.1-0.4,0.5-0.2
                                                                                         c7.3,4.4,14.6,8.8,21.9,13.3c0.1,0.1,0.2,0.1,0.3,0.2L3.2,109.1z"></path>
                                                                                      <path class="st1" d="M104.7,60.3c-0.6,3.1-1.2,6-1.7,9c-1,5.5-2.1,10.9-3.2,16.4c-0.2,0.8-0.1,0.8-0.8,0.4L78.2,74.2
                                                                                         c-0.2-0.1-0.3-0.2-0.6-0.3L104.7,60.3z"></path>
                                                                                   </g>
                                                                                </g>
                                                                             </svg>
                                                                          </span>
                                                                          <!-- <h1 style="font-size: 40px; color: rgb(0,50,93); font-weight: 900; letter-spacing: 0.5px; margin: 0; margin-top: 160px;  font-family: 'Helvetica Neue';">
                                                                             
                                                                          </h1> -->
                                                                       </td>
                                                                    </tr>
                                                                    <tr>
                                                                       <td style="padding: 40px; font-weight: 500; text-align: left; vertical-align: top; border-right: 0px; border-bottom: 0px; border-left: 0px; background-image: url(https://user-assets-unbounce-com.s3.amazonaws.com/558e04ab-9e3d-4116-b0e8-648f55779199/b739aa06-f3f3-442e-84c4-126967ee8735/bg-4.original.png); background-repeat: no-repeat; background-size: cover; background-position: top right">
                                                                          <h2 style="font-size: 24px; color: #fff; font-weight: 700; letter-spacing: 0.5px; margin: 0; margin-bottom: 10px; font-family: 'Helvetica Neue';">Scalelot Technologies</h2>
                                                                          <p style="font-size: 14px; line-height: 22px; color: #ddd; margin: 0; margin-bottom: 10px; font-family: 'Helvetica Neue';">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, est. Tempore quia eligendi commodi temporibus, animi eum non quos nulla repellendus, rerum veritatis aut. Vitae cupiditate quam ipsum temporibus necessitatibus!</p>
                                                                          <p style="font-size: 16px; color: #fff; margin: 0; font-family: 'Helvetica Neue';">Consectetur</p>
                                                                       </td>
                                                                    </tr>
                                                                    <tr>
                                                                       <td style="padding: 0 40px; padding-bottom: 25px; border-bottom: 0.5px solid #ddd; font-weight: 500; text-align: left; vertical-align: top; border-right: 0px; border-bottom: 0px; border-left: 0px;">
                                
                                                                          <table style="width: 100%; margin: 0 -4px; margin-top: 30px;">
                                                                             <tbody>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Full Name</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+first_name+` `+middle_name+` `+last_name`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Email</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+email+`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Contact Number</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+contrycode+` `+phone+`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">City</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+city+`</td>
                                                                                </tr>
                                                                                 <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Experience</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+experience+`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Select Position</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+selectedPosition+`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Joining</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+joining+`</td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; vertical-align: top; color: #fff; background: rgba(255,255,255,0.1); font-weight: 500; font-family: 'Helvetica Neue';">
                                                                                   <td style="white-space: nowrap; padding: 12px 15px; padding-right: 10px;">Message</td>
                                                                                   <td style="padding: 12px 0px;">:</td>
                                                                                   <td style="padding: 12px 10px;">`+message+`</td>
                                                                                </tr>
                                                                             </tbody>
                                                                          </table>
                                
                                                                          <table style="width: 100%; margin: 0 -4px; margin-top: 30px;">
                                                                             <tbody>
                                                                                <tr style="font-size: 14px; color: #fff; font-weight: 600;  font-family: 'Helvetica Neue';">
                                                                                   <td style="padding-bottom: 10px;">Dowload CV</td>
                                                                                </tr>
                                                                                <tr>
                                                                                   <td>
                                                                                      <a href="`+process.env.AWS_BUCKET_URI+cv+`" target="_blank"><button style="border: 1px solid #ddd; border-radius: 8px; outline: none; background: transparent; cursor: pointer; padding: 5px; width: 150px; height: 60px;">
                                                                                         <div style="width: 100%; height: 100%; border-radius: 8px; background: rgba(255,255,255,0.3);">
                                                                                            <span style="font-size: 14px; color: #fff; line-height: 50px; display: block; text-align: center;">Download Now</span>
                                                                                         </div>
                                                                                      </button></a>
                                                                                   </td>
                                                                                </tr>
                                                                                <tr style="font-size: 14px; color: #fff; font-weight: 600;  font-family: 'Helvetica Neue';">
                                                                                   <td style="padding-bottom: 10px;">Dowload Workflow</td>
                                                                                </tr>
                                                                                <tr>
                                                                                   <td>
                                                                                      <a href="`+process.env.AWS_BUCKET_URI+portfolio+`" target="_blank"><button style="border: 1px solid #ddd; border-radius: 8px; outline: none; background: transparent; cursor: pointer; padding: 5px; width: 150px; height: 60px;">
                                                                                         <div style="width: 100%; height: 100%; border-radius: 8px; background: rgba(255,255,255,0.3);">
                                                                                            <span style="font-size: 14px; color: #fff; line-height: 50px; display: block; text-align: center;">Download Now</span>
                                                                                         </div>
                                                                                      </button></a>
                                                                                   </td>
                                                                                </tr>
                                                                             </tbody>
                                                                          </table>
                                                                       </td>
                                                                    </tr>
                                                                    <tr>
                                                                       <td style="text-align: center; width: 100%; padding: 30px 0; padding-top: 15px; border-top: 0.5px solid #ddd;">
                                                                          <p style="font-size: 14px; font-weight: 500; color: #EF3238; margin-bottom: 10px;  font-family: 'Helvetica Neue';">Scalelot Technologies</p>
                                                                          <div style="text-align: center;">
                                                                             <a href="https://www.instagram.com/scalelot_technologies/" target="_blank" class="icon" style="display: inline-block; margin: 0 3px; vertical-align: middle; width: 26px;">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M305 256c0 27.063-21.938 49-49 49s-49-21.938-49-49 21.938-49 49-49 49 21.938 49 49zm0 0" fill="#ffffff" opacity="1" data-original="#000000" class=""></path><path d="M370.594 169.305a45.546 45.546 0 0 0-10.996-16.903 45.514 45.514 0 0 0-16.903-10.996c-5.18-2.011-12.96-4.406-27.293-5.058-15.504-.707-20.152-.86-59.402-.86-39.254 0-43.902.149-59.402.856-14.332.656-22.118 3.05-27.293 5.062a45.483 45.483 0 0 0-16.903 10.996 45.572 45.572 0 0 0-11 16.903c-2.011 5.18-4.406 12.965-5.058 27.297-.707 15.5-.86 20.148-.86 59.402 0 39.25.153 43.898.86 59.402.652 14.332 3.047 22.114 5.058 27.293a45.563 45.563 0 0 0 10.996 16.903 45.514 45.514 0 0 0 16.903 10.996c5.18 2.015 12.965 4.41 27.297 5.062 15.5.707 20.144.856 59.398.856 39.258 0 43.906-.149 59.402-.856 14.332-.652 22.118-3.047 27.297-5.062a48.68 48.68 0 0 0 27.899-27.899c2.011-5.18 4.406-12.96 5.062-27.293.707-15.504.856-20.152.856-59.402 0-39.254-.149-43.902-.856-59.402-.652-14.332-3.047-22.118-5.062-27.297zM256 331.485c-41.691 0-75.488-33.794-75.488-75.485s33.797-75.484 75.488-75.484c41.688 0 75.484 33.793 75.484 75.484S297.688 331.484 256 331.484zm78.469-136.313c-9.742 0-17.64-7.899-17.64-17.64s7.898-17.641 17.64-17.641 17.64 7.898 17.64 17.64c-.004 9.742-7.898 17.64-17.64 17.64zm0 0" fill="#ffffff" opacity="1" data-original="#000000" class=""></path><path d="M256 0C114.637 0 0 114.637 0 256s114.637 256 256 256 256-114.637 256-256S397.363 0 256 0zm146.113 316.605c-.71 15.649-3.199 26.333-6.832 35.684a75.164 75.164 0 0 1-42.992 42.992c-9.348 3.633-20.035 6.117-35.68 6.832-15.675.715-20.683.887-60.605.887-39.926 0-44.93-.172-60.61-.887-15.644-.715-26.331-3.199-35.68-6.832a72.018 72.018 0 0 1-26.038-16.957 72.044 72.044 0 0 1-16.953-26.035c-3.633-9.348-6.121-20.035-6.832-35.68-.723-15.68-.891-20.687-.891-60.609s.168-44.93.887-60.605c.71-15.649 3.195-26.332 6.828-35.684a72.013 72.013 0 0 1 16.96-26.035 72.003 72.003 0 0 1 26.036-16.957c9.352-3.633 20.035-6.117 35.684-6.832C211.07 109.172 216.078 109 256 109s44.93.172 60.605.89c15.649.712 26.332 3.196 35.684 6.825a72.061 72.061 0 0 1 26.04 16.96 72.027 72.027 0 0 1 16.952 26.036c3.637 9.352 6.121 20.035 6.836 35.684.715 15.675.883 20.683.883 60.605s-.168 44.93-.887 60.605zm0 0" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                             </a>
                                                                             <a href="https://dribbble.com/scalelot" target="_blank" class="icon" style="display: inline-block; margin: 0 3px; vertical-align: middle; width: 26px;">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" fill-rule="evenodd" class=""><g><path d="M256 0c141.39 0 256 114.61 256 256S397.39 512 256 512 0 397.39 0 256 114.61 0 256 0zm35.02 248.04c-3.06-7.08-6.25-14.15-9.66-21.14 29.07-12.59 52.43-29.69 69.84-51.37 16.98 20.06 27.64 45.55 29.21 73.44-32.41-5.31-62.21-5.6-89.39-.93zm34.23 111.67c-5.51-29.61-13.6-58.56-24.16-86.8 23.61-3.34 49.59-2.47 78.02 2.47-5.5 35.07-25.52 65.36-53.86 84.33zm-145.82-5.4c24.78-38.88 56.42-64.19 95.62-75.87 11.67 30.47 20.26 61.8 25.72 93.89-40.83 15.79-86.72 9.01-121.34-18.02zM131.4 252.79c48.43-.08 90.22-5.64 125.22-16.65 2.94 5.97 5.74 11.97 8.43 18.03-42.52 13.28-77.57 40.53-104.92 81.55-19.68-23.62-29.48-52.27-28.73-82.93zm68.31-107.99c16.76 21.93 31.6 44.54 44.51 67.73-30.59 9.01-67.09 13.63-109.3 13.92 8.72-35.68 32.74-65.35 64.79-81.65zm132.35 12.52c-15.16 19.55-36.09 35.01-62.76 46.31-12.79-23.42-27.39-46.27-43.9-68.44 37.36-9.52 76.01-1.55 106.66 22.13zM256 104.96c-83.41 0-151.04 67.63-151.04 151.04S172.59 407.04 256 407.04c83.42 0 151.04-67.63 151.04-151.04S339.41 104.96 256 104.96z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                             </a>
                                                                             <a href="https://www.facebook.com/scalelottech/" target="_blank" class="icon" style="display: inline-block; margin: 0 3px; vertical-align: middle; width: 26px;">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 49.652 49.652" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M24.826 0C11.137 0 0 11.137 0 24.826c0 13.688 11.137 24.826 24.826 24.826 13.688 0 24.826-11.138 24.826-24.826C49.652 11.137 38.516 0 24.826 0zM31 25.7h-4.039v14.396h-5.985V25.7h-2.845v-5.088h2.845v-3.291c0-2.357 1.12-6.04 6.04-6.04l4.435.017v4.939h-3.219c-.524 0-1.269.262-1.269 1.386v2.99h4.56z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                             </a>
                                                                             <a href="https://www.linkedin.com/company/scalelot-technologies/" target="_blank" class="icon" style="display: inline-block; margin: 0 3px; vertical-align: middle; width: 26px;">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" x="0" y="0" viewBox="0 0 152 152" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g data-name="Layer 2"><path d="M76 0a76 76 0 1 0 76 76A76 76 0 0 0 76 0zM53.9 116H37.32V62.59H53.9zm-8.3-60.7a9.65 9.65 0 1 1 9.61-9.7 9.68 9.68 0 0 1-9.61 9.7zM116 116H99.43V90c0-6.2-.12-14.15-8.62-14.15s-10 6.74-10 13.7V116H64.3V62.59h15.91v7.28h.23c2.21-4.2 7.62-8.63 15.69-8.63 16.78 0 19.87 11.06 19.87 25.42z" data-name="10.Linkedin" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></g></svg>
                                                                             </a>
                                                                          </div>
                                                                          <p style="font-size: 10px; font-weight: 400; color: #fff; margin-bottom: 0; margin-top: 5px;  font-family: 'Helvetica Neue';">Copyright © 2023 Scalelot by Scalelot Technologies . All Rights Reserved</p>
                                                                       </td>
                                                                    </tr>
                                                                 </tbody>
                                                              </table>
                                                           </td>
                                                        </tr>
                                                     </tbody>
                                                  </table>
                                               </td>
                                            </tr>
                                         </tbody>
                                      </table>
                                      <!-- End -->
                                   </body>
                                </html>`,
                              }).then((response) => {
                                return responseManager.onSuccess('Your Application has been saved successfully. You will get call & email from our executive for the interview, Stay tune...', 1, res);
                              }).catch((error) => {
                                return responseManager.onError(error, res);
                              });
                            } else {
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
