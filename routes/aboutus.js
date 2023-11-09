var express = require('express');
var router = express.Router();
const brevo = require('@getbrevo/brevo');
let defaultClient = brevo.ApiClient.instance;
let apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;
let apiInstance = new brevo.TransactionalEmailsApi();
let sendSmtpEmail = new brevo.SendSmtpEmail();
const mongoConnection = require('../utilities/connections');
const responseManager = require('../utilities/response.manager');
const constants = require('../utilities/constants');
const subscriberModel = require('../models/subscribers.model');
router.get('/', async (req, res) => {
  res.render('aboutus', { title: 'Scalelot - Treat With Technologies' , page : 'aboutus'});
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
        email: email,
        timestamp: Date.now()
      };
      await primary.model(constants.MODELS.subscribers, subscriberModel).create(obj);
      sendSmtpEmail.subject = 'Welcome, This is confirmation mail for your subscription - Scalelot Technologies';
      sendSmtpEmail.htmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <title>Corp</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
          <meta name="viewport" content="width=display-width, initial-scale=1.0, maximum-scale=1.0,">
          <link href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i" rel="stylesheet" type="text/css">
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet" type="text/css">
          <style type="text/css">		
            html { width: 100%; }
            body {margin:0; padding:0; width:100%; -webkit-text-size-adjust:none; -ms-text-size-adjust:none;}
            img { display: block !important; border:0; -ms-interpolation-mode:bicubic;}
      
            .ReadMsgBody { width: 100%;}
            .ExternalClass {width: 100%;}
            .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
            .images {display:block !important; width:100% !important;}
            
            .heading {font-family: Roboto, Arial, Helvetica Neue, Helvetica, sans-serif !important;}
            .MsoNormal {font-family: 'Open Sans', Arial, Helvetica Neue, Helvetica, sans-serif !important;}	
            p {margin:0 !important; padding:0 !important;}						
            .display-button td, .display-button a  {font-family: 'Open Sans', Arial, Helvetica Neue, Helvetica, sans-serif !important;}
            .display-button a:hover {text-decoration:none !important;}
            
            /* MEDIA QUIRES */
            @media only screen and (min-width:799px)
            {
              .saf-table {
                display:table !important;
              }
              .main-width {
                width:600px;
              }
              .width800 {
                width:800px !important;
                max-width:800px !important;
              }
            }
            @media only screen and (max-width:799px)
                  {
                      body {width:auto !important;}
              .display-width {width:100% !important;}	
              .display-width-inner {width:600px !important;}	
              .padding { padding:0 20px !important; }	
              .res-padding-full { padding:0px !important; }
              .res-padding-left{padding-left: 0px !important;}
              .res-padding-right{padding-right: 0px !important;}
              .width800 {
                width:100% !important;
                max-width:100% !important;
              }
              .prod-fullwidth 
              {
                display: block !important;
                width:100% !important;
                max-width:100% !important;
              }
                  }
            @media only screen and (max-width:768px)
                  {	
              .width768{
                max-width:684px !important;
              }
              .child1-width{
                width:50% !important;
                max-width:50% !important;
              }
              .child2-width{
                width:50% !important;
                max-width:50% !important;
              }
              .full-width-height
              { 	
                padding-top:28px !important;
                padding-bottom:28px !important;
              }
              .innovation-height
              { 	
                padding-top:26px !important;
                padding-bottom:26px !important;
              }
            }
            @media only screen and (max-width:680px)
            {	
              .child1-width{
                width:50% !important;
                max-width:50% !important;
              }
              .child2-width{
                width:50% !important;
                max-width:50% !important;
              }
              .res-padding-left{
                padding-left: 40px !important;
              }
              .res-padding-right{
                padding-right: 40px !important;
              }
              .padding-hide
              {	
                padding-bottom:0px !important;
              }
              .res-attract-height {
                padding: 20px 10px 0 10px !important;
              }
              .full-width-height
              { 	
                padding-top:35px !important;
                padding-bottom:30px !important;
              }
              .innovation-height
              { 	
                padding-top:25px !important;
                padding-bottom:25px !important;
              }
            }
            @media only screen and (max-width:660px)
            {
              .child1-width{
                width:50% !important;
                max-width:50% !important;
              }
              .child2-width{
                width:50% !important;
                max-width:50% !important;
              }
              .res-padding-left{
                padding-left: 30px !important;
              }
              .res-padding-right{
                padding-right: 30px !important;
              }
              .res-attract-height {
                padding: 20px 10px 0 10px !important;
              }
              .full-width-height
              { 	
                padding-top:36px !important;
                padding-bottom:20px !important;
              }
              .innovation-height
              { 	
                padding-top:20px !important;
                padding-bottom:20px !important;
              }
            }
            @media only screen and (max-width:640px)
            {
              .res-attract-height {
                padding: 20px 10px 0 10px !important;
              }
              .child1-width, .child2-width{
                width:50% !important;
                max-width:50% !important;
              }
              .res-padding-left{
                padding-left: 20px !important;
              }
              .res-padding-right{
                padding-right: 20px !important;
              }
              .full-width-height
              { 	
                padding-top:23px !important;
                padding-bottom:23px !important;
              }
              .innovation-height
              { 	
                padding-top:13px !important;
                padding-bottom:13px !important;
              }
            }
            @media only screen and (max-width:639px)
            {
              body {width:auto !important;}
              .display-width {width:100% !important;}
              .display-width-inner,  
              .display-width-child {width:100% !important;}
              .display-width-child .button-width .display-button {width:auto !important;}
              .res-padding-full { padding:0 20px !important; }
              .padding-hide{ padding:0px !important; }
              .padding { padding:0 20px !important; }
              .saf-table {
                display:block !important;
              }
              .width282 {
                  width:282px !important;  
              }
              .div-width {				
              display: block !important;
              width: 100% !important;
              max-width: 100% !important;
              }
              .res-height20-bottom { padding-bottom:20px !important;}
              .res-height-top { padding-top:60px !important;}
              .full-width-height { padding-bottom:60px !important;}
              .innovation-height { padding-bottom:60px !important;}
              .footer-width {width:170px !important;}
              .height20 {height:20px !important; line-height:20px !important;}
              .height30 {height:30px !important;}
              .height60 {height:60px !important; line-height:60px !important;}
              .hide-height, .hide-bar {display:none !important;}
              .hide-border {border:0 !important;}
              .txt-center {text-align:center !important;}
              .res-center{
                margin:0 auto !important;
                display:table !important;
              }
              .txt-center {text-align:center !important;}
              span.unsub-width {width:100% !important;
              display:block !important; padding-bottom:10px !important; }
            }
            
            @media only screen and (max-width:480px) 
            {
              .display-width table, .display-width-child2 table {width:100% !important;}
              .display-width .button-width .display-button {width:auto !important;}
              .display-width-child .footer-width {width:170px !important;}
              .display-width .width282 {
                  width:282px !important;  
              }
              .div-width {				
                display: block !important;
                width: 100% !important;
                max-width: 100% !important;
              }
            }
            @media only screen and (max-width:420px)
            {
              .plan-cont-font {font-size:13px !important;}
              .plan-price-font {font-size:20px !important;}
            }
            @media only screen and (max-width:380px)
            {
              .display-width table {width:100% !important;}
              .display-width .button-width .display-button {width:auto !important;}
              .display-width-child .width282 { width:100% !important;}
              .plan-cont-font {font-size:12px !important;}
              .plan-price-font {font-size:16px !important;}
            }
            @media only screen and (min-width:300px) and (max-width:360px)
            {
              .plan-cont-font {font-size:9px !important;}
              .plan-price-font {font-size:14px !important;}
              .height43 {height:43px !important; line-height:43px !important;}
            }
          </style>
        </head>
        <body>
          <!--[if (gte mso 9)|(IE)]>
            <style >
              .Heading {font-family: Arial, Helvetica Neue, Helvetica, sans-serif !important;}
              .MsoNormal {font-family: Arial, Helvetica Neue, Helvetica, sans-serif !important;}
              .display-button td, .display-button a, a {font-family: Arial, Helvetica Neue, Helvetica, sans-serif !important;}			
            </style>
          <![endif]-->
          <!-- HEADER STARTS -->
          <repeater>
            <layout label='HEADER STARTS'>
              <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size:0;">
                    <!--[if (gte mso 9)|(IE)]>
                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                  <tr>
                    <td align="center" valign="top" width="800">
                      <![endif]-->
                    <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                      <!-- ID:BG HEADER OPTIONAL -->
                      <table align="center" border="0" bgcolor="#000000" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                        <tr>
                          <td align="center">
                            <!--[if gte mso 9]>
                              <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:800px; height:482px; margin:auto;">
                              <v:fill type="frame" src="https://www.pennyblacktemplates.com/demo/corp/images/800x640.jpg" color="#f6f8f7" />
                              <v:textbox inset="0,0,0,0">
                              <![endif]-->
                            <div style="margin:auto;">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="background-image:url(https://user-assets-unbounce-com.s3.amazonaws.com/558e04ab-9e3d-4116-b0e8-648f55779199/20c66704-b2c3-474f-8b8a-950a59790650/home.original.jpg); background-position:center; background-repeat:no-repeat;">
                                <tr>
                                  <td align="center" class="padding">
                                    <!--[if (gte mso 9)|(IE)]>
                                      <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
                                        <tr>
                                          <td align="center" valign="top" width="600">
                                            <![endif]-->
                                    <div style="display:inline-block;width:100%; max-width:600px; vertical-align:top;" class="main-width">
                                      <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                        <tr>
                                          <td height="50" style="mso-line-height-rule: exactly; line-height: 50px; font-size:0;">
                                            &nbsp;
                                          </td>
                                        </tr>
                                        <tr>
                                          <td align="left" style="padding:0 10px;">
                                            <!--[if (gte mso 9)|(IE)]>
                                                    <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="left" width="510">
                                                      <tr>
                                                        <td align="left" valign="top" width="510" style="width:510px;">
                                                          <![endif]-->
                                            <div style="display:inline-block; width:100%; max-width:510px; vertical-align:top;">
                                              <table align="left" border="0" class="display-width-child" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                                                <tr>
                                                  <td align="left">
                                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="90%" style="width:90% !important; max-width:90% !important;">
                                                      <tr>
                                                        <!-- ID:TXT HEADER SUBTITLE -->
                                                        <td align="left" class="MsoNormal" style="color:#ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400; letter-spacing:1px;">
                                                          <span style="display: block;">
                                                            <svg version="1.1" width="250px" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 613 131.3" style="enable-background:new 0 0 613 131.3;" xml:space="preserve"> <style type="text/css"> .st0{fill:#FFFFFF;} .st1{fill:#EF3238;} </style> <g> <g> <path class="st0" d="M453.3,14.7h-8.5v8.5h8.5V14.7z"></path> <path class="st0" d="M478.8,20.9h-8.5v8.5h8.5V20.9z"></path> <path class="st0" d="M441,20.9h-8.5v8.5h8.5V20.9z"></path> <path class="st0" d="M427.1,0h-7.7v8.5h7.7V0z"></path> <path class="st0" d="M414.7,20.9h-8.5v8.5h8.5V20.9z"></path> <path class="st0" d="M399.2,0h-7.7v8.5h7.7V0z"></path> <path class="st0" d="M386.9,14.7h-7.7v8.5h7.7V14.7z"></path> <path class="st0" d="M374.5,20.9H366v8.5h8.5V20.9z"></path> <path class="st1" d="M374.5,9.3H366V17h8.5V9.3z"></path> <path class="st1" d="M414.7,9.3h-8.5V17h8.5V9.3z"></path> <path class="st1" d="M399.2,14.7h-7.7v8.5h7.7V14.7z"></path> <path class="st1" d="M427.1,14.7h-7.7v8.5h7.7V14.7z"></path> <path class="st1" d="M441,9.3h-8.5V17h8.5V9.3z"></path> <path class="st1" d="M466.4,14.7h-9.3v8.5h9.3V14.7z"></path> <path class="st1" d="M478.8,9.3h-8.5V17h8.5V9.3z"></path> </g> <g> <path class="st0" d="M161.3,44.9h-6.6c-3.1,0-6.3,0.1-9.7,0.3c-3.4,0.2-6.1,1.1-8.2,2.6c-0.9,0.6-1.7,1.3-2.3,2.2 c-0.6,0.9-1,1.9-1.2,2.9c-1,4.5-1,9.2,0,13.7c0.2,1.1,0.6,2.1,1.2,2.9c0.6,0.9,1.4,1.6,2.3,2.2c2.1,1.5,4.9,2.3,8.2,2.5 c3.4,0.2,6.6,0.3,9.7,0.3h6.6c2.3,0,4.6,0,7,0.1c2.4,0,4.8,0.2,7.1,0.6c2.2,0.3,4.4,0.8,6.5,1.5c1.9,0.6,3.7,1.5,5.3,2.6 c1.4,1.1,2.6,2.4,3.5,4c0.9,1.5,1.5,3.2,1.9,4.9c0.4,1.8,0.7,3.7,0.7,5.5c0.1,1.9,0.1,3.8,0.1,5.7c0,1.8,0,3.7-0.1,5.7 c-0.1,1.9-0.3,3.7-0.7,5.6c-0.4,1.7-1,3.4-1.9,4.9c-0.9,1.5-2.1,2.9-3.5,4c-1.6,1.2-3.4,2.2-5.3,2.8c-2.1,0.7-4.3,1.1-6.5,1.4 c-2.4,0.3-4.7,0.4-7.1,0.5c-2.4,0-4.8,0.1-7,0.1h-6.6c-2.3,0-4.6,0-7.1-0.1c-2.4-0.1-4.8-0.2-7.1-0.5c-2.2-0.3-4.4-0.7-6.6-1.4 c-1.9-0.6-3.7-1.5-5.3-2.8c-1.3-1-2.4-2.4-3.1-3.9c-1-2-1.4-4.2-1.4-6.4h11.5c0.7,1.3,1.7,2.4,3,3c1.5,0.7,3,1.2,4.7,1.5 c1.8,0.3,3.7,0.4,5.5,0.5c2,0,3.9,0.1,5.8,0.1h6.6c3.2,0,6.5-0.1,9.8-0.4c2.9-0.1,5.7-1,8.1-2.6c1.8-1.2,3.1-3,3.6-5.2 c1.1-4.5,1.1-9.2,0-13.6c-0.5-2.1-1.8-4-3.6-5.1c-2.4-1.6-5.3-2.4-8.1-2.5c-3.3-0.2-6.6-0.3-9.8-0.3h-6.6c-2.3,0-4.6,0-7-0.1 c-2.4,0-4.8-0.2-7.1-0.6c-2.2-0.3-4.4-0.8-6.6-1.5c-1.9-0.6-3.7-1.5-5.3-2.6c-1.4-1.1-2.6-2.4-3.4-4c-0.8-1.6-1.4-3.2-1.8-4.9 c-0.4-1.8-0.7-3.7-0.8-5.6c-0.1-1.9-0.1-3.9-0.1-5.7c0-1.9,0-3.8,0.1-5.7c0.1-1.9,0.3-3.8,0.8-5.6c0.4-1.7,1-3.4,1.8-4.9 c0.9-1.6,2-2.9,3.4-4c1.6-1.3,3.4-2.2,5.3-2.8c2.1-0.7,4.3-1.1,6.6-1.4c2.4-0.3,4.7-0.4,7.1-0.5c2.4,0,4.8-0.1,7-0.1h6.6 c2.3,0,4.6,0,7,0.1c2.4,0.1,4.8,0.2,7.1,0.5c2.2,0.3,4.4,0.7,6.5,1.4c1.9,0.6,3.7,1.6,5.3,2.8c1.5,1.1,2.6,2.6,3.4,4.3 c1,1.9,1.5,4.1,1.5,6.3h-11.4c-0.6-1.3-1.6-2.4-2.9-3.1c-1.5-0.8-3.1-1.3-4.8-1.6c-1.9-0.3-3.9-0.5-5.9-0.6L161.3,44.9z"></path> <path class="st0" d="M274.4,118.3c-1.5,1.5-3.3,2.7-5.3,3.5c-2.1,0.8-4.3,1.5-6.5,1.8c-2.4,0.4-4.7,0.6-7.1,0.6 c-2.5,0-4.8,0.1-7.1,0.1h-6.6c-2.3,0-4.6,0-7.1-0.1c-2.4,0-4.7-0.2-7.1-0.6c-2.2-0.4-4.4-1-6.4-1.8c-4-1.6-7.1-4.7-8.8-8.6 c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7s0-4.7,0.1-7c0-2.3,0.3-4.6,0.6-6.9c0.4-2.2,1-4.3,1.8-6.3 c1.7-3.9,4.9-7,8.8-8.6c2.1-0.9,4.2-1.5,6.4-1.8c2.3-0.4,4.7-0.6,7.1-0.6c2.4,0,4.8-0.1,7.1-0.1h6.6c2.3,0,4.6,0,7.1,0.1 c2.4,0,4.8,0.3,7.1,0.6c2.2,0.3,4.4,1,6.5,1.8c2,0.8,3.8,2,5.3,3.5c1.8,1.8,3.2,4,3.9,6.5c0.8,2.5,1.3,5.1,1.7,7.7l-10.6,1.1 c-0.3-1.3-0.7-2.6-1.2-3.9c-0.5-1.2-1.3-2.3-2.3-3.2c-1-1-2.3-1.8-3.6-2.4c-1.4-0.6-2.9-1-4.4-1.3c-1.6-0.3-3.2-0.4-4.8-0.5 c-1.6,0-3.2-0.1-4.7-0.1h-6.7c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.7,0.5c-1.5,0.3-3,0.7-4.4,1.3c-1.4,0.5-2.6,1.3-3.6,2.4 c-2.1,2.1-3.4,4.8-3.6,7.7c-0.7,6.2-0.7,12.5,0,18.8c0.3,2.9,1.5,5.6,3.6,7.7c1,1,2.3,1.8,3.6,2.4c1.4,0.6,2.9,1,4.4,1.3 c1.6,0.3,3.1,0.4,4.7,0.5c1.6,0,3.2,0.1,4.8,0.1h6.6c1.5,0,3.1,0,4.7-0.1c1.6,0,3.2-0.2,4.8-0.5c1.5-0.3,3-0.7,4.4-1.3 c1.3-0.5,2.6-1.3,3.6-2.4c1-0.9,1.8-2,2.3-3.2c0.5-1.3,0.9-2.6,1.2-3.9l10.6,1.1c-0.4,2.6-0.9,5.2-1.7,7.7 C277.6,114.3,276.3,116.5,274.4,118.3z"></path> <path class="st0" d="M341.8,124.3v-1.5c-2.8,0.8-5.8,1.2-8.7,1.4c-3.1,0.1-6.2,0.2-9.1,0.2h-5.3c-1.9,0-4,0-6.1-0.1 c-2.1-0.1-4.2-0.2-6.2-0.4c-1.9-0.2-3.8-0.6-5.7-1.1c-1.6-0.4-3.2-1.2-4.6-2.1c-1.2-0.8-2.1-1.8-2.9-3c-0.8-1.2-1.3-2.5-1.5-3.9 c-0.5-2.9-0.8-5.8-0.8-8.8c0-1.5,0-3,0.1-4.5c0.1-1.5,0.3-2.9,0.7-4.4c0.4-1.4,0.9-2.7,1.6-3.9c0.7-1.2,1.7-2.3,2.8-3.1 c1.4-1,3-1.7,4.6-2.2c1.9-0.5,3.8-0.9,5.7-1.1c2-0.2,4.1-0.4,6.2-0.4c2.1,0,4.2-0.1,6.1-0.1h5.2c2.9,0,6,0.1,9.1,0.2 c2.9,0.1,5.8,0.5,8.7,1.3v-1.5c0-2-0.2-4.1-0.5-6.1c-0.3-1.9-1.3-3.7-2.8-4.8c-1.9-1.4-4.2-2.2-6.6-2.3c-2.7-0.2-5.3-0.4-7.9-0.4 h-5.3c-2.6,0-5.2,0.1-7.9,0.3c-2.4,0.1-4.7,0.9-6.6,2.3c-0.5,0.4-1,0.8-1.4,1.4c-0.4,0.6-0.7,1.2-1,1.8l-10.6-1.7 c0.3-1.8,0.8-3.6,1.5-5.3c0.8-1.7,1.9-3.2,3.3-4.4c1.4-1.2,2.9-2,4.6-2.6c1.8-0.6,3.7-1.1,5.7-1.3c2-0.3,4.1-0.4,6.1-0.5 c2.1-0.1,4.2-0.1,6.2-0.1h5.2c2,0,4.1,0,6.2,0.1c2.1,0,4.1,0.2,6.1,0.5c1.9,0.3,3.8,0.7,5.6,1.3c1.7,0.5,3.3,1.4,4.6,2.6 c1.3,1.1,2.3,2.4,3,3.9c0.8,1.5,1.3,3.1,1.6,4.7c0.3,1.7,0.5,3.4,0.6,5.1c0,1.8,0.1,3.5,0.1,5.3v39.1L341.8,124.3z M318.8,95.4 c-2.5,0-5.1,0-7.8,0.1c-2.3,0-4.6,0.5-6.7,1.5c-1.3,0.7-2.2,1.9-2.6,3.3c-0.5,1.5-0.7,3-0.7,4.5c0,1.5,0.2,3,0.7,4.4 c0.4,1.4,1.4,2.5,2.6,3.2c2.1,1,4.4,1.6,6.7,1.6c2.7,0.1,5.3,0.2,7.8,0.2h5.2c2.5,0,5.1-0.1,7.8-0.2c2.3,0,4.6-0.6,6.7-1.6 c1.2-0.7,2.2-1.8,2.6-3.2c0.5-1.4,0.7-2.9,0.7-4.4c0-1.5-0.2-3.1-0.7-4.5c-0.4-1.4-1.4-2.6-2.6-3.3c-2.1-1-4.4-1.5-6.7-1.5 c-2.7-0.1-5.3-0.1-7.8-0.1H318.8z"></path> <path class="st0" d="M373.6,37.8v86.5h-10V37.8H373.6z"></path> <path class="st0" d="M442.9,108.3l10.7,2.9c-0.7,3.1-2.4,5.9-4.9,7.9c-1.5,1.3-3.3,2.3-5.2,3c-2.1,0.7-4.2,1.2-6.4,1.5 c-2.3,0.3-4.7,0.5-7,0.6c-2.4,0-4.7,0.1-7,0.1h-6.4c-2.3,0-4.7,0-7-0.1c-2.3,0-4.7-0.3-7-0.6c-2.2-0.4-4.3-1-6.4-1.8 c-3.9-1.6-7-4.7-8.7-8.6c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7s0-4.6,0.1-7c0-2.3,0.3-4.6,0.6-6.9 c0.3-2.2,0.9-4.3,1.8-6.3c1.7-3.9,4.8-7,8.7-8.6c2.1-0.9,4.2-1.5,6.4-1.8c2.3-0.4,4.6-0.6,7-0.6c2.4,0,4.7-0.1,7-0.1h6.4 c2.3,0,4.7,0,7,0.1c2.3,0,4.7,0.3,7,0.6c2.2,0.3,4.3,1,6.4,1.8c3.9,1.6,7,4.7,8.6,8.6c0.9,2,1.5,4.1,1.8,6.3 c0.4,2.3,0.6,4.6,0.6,6.9c0,2.4,0.1,4.7,0.1,7v5.1h-59.3c0.1,2.2,0.4,4.4,1,6.6c0.5,2,1.6,3.9,3.1,5.4c1,1,2.2,1.8,3.5,2.4 c1.4,0.6,2.8,1,4.3,1.3c1.6,0.3,3.1,0.4,4.7,0.5c1.6,0,3.2,0.1,4.8,0.1h6.4c1.9,0,3.9,0,6-0.1c1.9-0.1,3.8-0.3,5.7-0.7 c1.7-0.3,3.3-1,4.8-1.8C441,110.9,442.1,109.8,442.9,108.3z M440.5,75.9c-2.1-2.1-4.9-3.4-7.8-3.6c-3.2-0.4-6.3-0.6-9.5-0.6h-6.4 c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.7,0.5c-1.5,0.3-2.9,0.7-4.3,1.3c-1.3,0.5-2.5,1.3-3.5,2.4c-1.5,1.5-2.5,3.3-3.1,5.4 c-0.6,2.2-0.9,4.4-1,6.6h49.2c-0.1-2.2-0.4-4.4-1-6.6C443,79.3,442,77.4,440.5,75.9L440.5,75.9z"></path> <path class="st0" d="M478.6,37.8v86.5h-10.8V37.8H478.6z"></path> <path class="st0" d="M552.9,67.8c1.5,1.5,2.7,3.2,3.5,5.1c0.9,2,1.5,4.1,1.8,6.3c0.4,2.3,0.6,4.6,0.6,6.9c0,2.4,0.1,4.7,0.1,7 c0,2.3,0,4.6-0.1,7c0,2.3-0.2,4.6-0.6,6.9c-0.3,2.2-1,4.3-1.8,6.3c-1.7,3.9-4.8,7-8.8,8.6c-2.1,0.8-4.2,1.5-6.5,1.8 c-2.3,0.4-4.7,0.6-7,0.6c-2.4,0-4.8,0.1-7.1,0.1h-6.5c-2.3,0-4.7,0-7.1-0.1c-2.4,0-4.7-0.2-7-0.6c-2.2-0.4-4.4-1-6.5-1.8 c-3.9-1.6-7.1-4.7-8.8-8.6c-0.9-2-1.5-4.1-1.8-6.3c-0.4-2.3-0.6-4.6-0.6-6.9c0-2.4-0.1-4.7-0.1-7c0-2.3,0-4.6,0.1-7 c0-2.3,0.3-4.6,0.6-6.9c0.4-2.2,1-4.3,1.8-6.3c1.7-3.9,4.8-7,8.8-8.6c2.1-0.9,4.2-1.5,6.5-1.8c2.3-0.4,4.7-0.6,7-0.6 c2.4,0,4.8-0.1,7.1-0.1h6.5c2.3,0,4.7,0,7.1,0.1c2.4,0,4.7,0.3,7,0.6c2.2,0.3,4.4,1,6.5,1.8C549.6,65.1,551.4,66.3,552.9,67.8 L552.9,67.8z M520.5,71.8c-1.6,0-3.2,0-4.8,0.1c-1.6,0-3.2,0.2-4.8,0.5c-1.5,0.3-2.9,0.7-4.3,1.3c-1.3,0.5-2.6,1.3-3.6,2.4 c-2.1,2.1-3.3,4.8-3.6,7.7c-0.6,6.2-0.6,12.5,0,18.8c0.2,2.9,1.5,5.6,3.6,7.7c1,1,2.2,1.8,3.6,2.4c1.4,0.6,2.9,1,4.3,1.3 c1.6,0.3,3.2,0.4,4.8,0.5c1.6,0,3.2,0.1,4.8,0.1h6.5c1.6,0,3.2,0,4.8-0.1c1.6,0,3.2-0.2,4.8-0.5c1.5-0.3,2.9-0.7,4.3-1.3 c1.3-0.5,2.6-1.3,3.6-2.4c2.1-2.1,3.4-4.8,3.6-7.7c0.7-6.2,0.7-12.5,0-18.8c-0.3-2.9-1.6-5.7-3.7-7.8c-2.1-2.1-4.9-3.3-7.9-3.6 c-3.2-0.4-6.4-0.6-9.6-0.6H520.5z"></path> <path class="st0" d="M586.3,61.7V37.8h10.3v23.8H613v10h-16.4v52.6h-10.3V71.7h-16.6v-10H586.3z"></path> </g> <g> <path class="st0" d="M31.9,30.1h7c0.1,0,0.2,0.1,0.3,0.1c0.1,0.1,0.2,0.1,0.2,0.2c0.8,1.4,1.6,2.8,2.3,4.2 c0.1,0.2,0.2,0.4,0.4,0.5c0.2,0.1,0.4,0.2,0.6,0.1c15.7,0,31.4,0,47.1,0c1.8,0,3.7,0.4,5.3,1.1c2.4,1,4.5,2.5,6.3,4.4 c1.8,1.9,3.2,4.1,4.1,6.5c0.2,0.4,0.1,0.6-0.3,0.8c-7.1,3.4-14.2,6.8-21.3,10.2L56.8,71.3c-0.2,0.1-0.4,0.2-0.6,0.3 c0.2,0.1,0.3,0.3,0.5,0.4c9,6.4,18.5,12.2,27.7,18.2c4.3,2.8,8.6,5.6,13,8.3c0.2,0.1,0.3,0.3,0.4,0.5c0.1,0.2,0.1,0.4,0.1,0.6 c-0.6,6.6-3.4,12.1-7.7,17c-3.4,3.8-7.6,6.6-12.2,8.9c-0.4,0.2-0.5-0.1-0.6-0.3c-3-6.3-6.1-12.6-9.1-19c-12-25.1-24-50.3-36-75.4 C32.1,30.6,32.1,30.4,31.9,30.1z"></path> <path class="st0" d="M52.8,94.4c-1.3-0.9-2.5-1.7-3.8-2.5C36.5,84.4,24,77,11.5,69.6c-0.2-0.1-0.3-0.2-0.4-0.3 c-0.1-0.1-0.1-0.3-0.1-0.5c0.5-5.7,1.7-11.2,3.6-16.5c1.2-3.3,2.9-6.4,5.1-9.1c2.7-3.2,6.1-5.4,10.3-6.1c1.2-0.2,1.2-0.2,1.7,0.9 c10.8,23,21.6,46.1,32.4,69.1c3.6,7.7,7.2,15.4,10.8,23.1c0.1,0.2,0.2,0.4,0.3,0.6l-3.9,0.3c-0.8,0.1-1.6,0.1-2.3,0.2 c-0.1,0-0.3,0-0.4,0c-0.1-0.1-0.2-0.2-0.3-0.3c-0.8-1.6-1.6-3.2-2.4-4.8c-0.1-0.1-0.2-0.3-0.3-0.4c-0.1-0.1-0.3-0.1-0.4-0.1h-63 c-0.5,0-1,0-1.6,0c-0.5,0-0.6-0.2-0.7-0.6c-0.1-0.6,0-1.2,0.3-1.8c0.3-0.6,0.6-1,1.1-1.4l50.7-27.3C52.4,94.6,52.5,94.5,52.8,94.4 z"></path> <path class="st1" d="M3.2,109.1c0.2-1.1,0.4-2,0.6-3c1.6-7.8,3.3-15.6,4.9-23.3c0.1-0.3,0.1-0.4,0.5-0.2 c7.3,4.4,14.6,8.8,21.9,13.3c0.1,0.1,0.2,0.1,0.3,0.2L3.2,109.1z"></path> <path class="st1" d="M104.7,60.3c-0.6,3.1-1.2,6-1.7,9c-1,5.5-2.1,10.9-3.2,16.4c-0.2,0.8-0.1,0.8-0.8,0.4L78.2,74.2 c-0.2-0.1-0.3-0.2-0.6-0.3L104.7,60.3z"></path> </g> </g> </svg>
                                                          </span>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td height="100" style="mso-line-height-rule: exactly; line-height:100px; font-size:0;">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <!-- ID:TXT HEADER SUBTITLE -->
                                                        <td align="left" class="MsoNormal" style="color:#ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:18px; line-height:24px; font-weight:500; letter-spacing:1px;">
                                                          <multiline> Dear New Subscriber, </multiline>
                                                        </td>
                                                      </tr>
                                                      <!--BORDER BOTTOM FOR TEXT WIDTH-->
                                                      <tr>
                                                        <td align="left">
                                                          <table align="left" border="0" cellpadding="0" cellspacing="0" class="display-width" width="40" style="mso-table-lspace:0pt; mso-table-rspace:0pt; width:40px !important;">
                                                            <tr>
                                                              <!-- ID:BR HEADER SUBTITLE BORDER -->
                                                              <td align="center" height="2" style="border-bottom:2px solid #00bfff; line-height:2px; mso-line-height-rule: exactly; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td height="10" style="mso-line-height-rule: exactly; line-height:10px; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                      <!-- -->
                                                      <tr>
                                                        <!-- ID:TXT HEADER HEADING -->
                                                        <!-- <td align="left" class="heading" style="color:#ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:32px; line-height:42px; font-weight:700; letter-spacing:1px;">
                                                          <multiline> WELCOME TO CORPORATE </multiline>
                                                        </td> -->
                                                        <td align="left" class="heading" style="color:#ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:22px; line-height:30px; font-weight:600; letter-spacing:1.5px;padding-top: 10px;">
                                                          <multiline> Welcome to <span style="color: #EF3238;">Scalelot Technologies!</span> We're thrilled to have you on board as part of our online community. </multiline>
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <td height="5" style="mso-line-height-rule: exactly; line-height:5px; font-size:0;">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                      <tr>
                                                        <!-- ID:TXT HEADER CONTENT -->
                                                        <!-- <td align="left" class="MsoNormal" style="color:#cccccc; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:400; letter-spacing:4px; line-height:24px;">
                                                          <multiline> EXPAND YOUR BUSINESS TO GLOBAL </multiline>
                                                        </td> -->
                                                      </tr>
                                                      <tr>
                                                        <td height="20" style="mso-line-height-rule: exactly; line-height:20px; font-size:0;">
                                                          &nbsp;
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                            <!--[if (gte mso 9)|(IE)]>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                    <![endif]-->
                                          </td>
                                        </tr>
                                        <tr>
                                          <td height="160" style="mso-line-height-rule: exactly; line-height: 160px; font-size:0;">
                                            &nbsp;
                                          </td>
                                        </tr>
                                      </table>
                                    </div>
                                    <!--[if (gte mso 9)|(IE)]>
                                          </td>
                                        </tr>
                                      </table>
                                      <![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if gte mso 9]> </v:textbox> </v:rect> <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </table>
                <![endif]-->
                  </td>
                </tr>
              </table>
            </layout>
          </repeater>
          <!-- HEADER ENDS -->
          <!-- WHAT WE ARE DOING TOP SPACE BEGINING -->
          <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td align="center" style="font-size:0;">
                  <!--[if mso]>
                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                    <tr>
                      <td align="center" valign="top" width="100%" style="max-width:800px;">
                        <![endif]-->
                  <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                    <!-- ID:BG SECTION-1 -->
                    <table align="center" border="0" bgcolor="#000" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                      <tbody>
                        <tr>
                          <td align="center" class="padding">
                            <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                        <![endif]-->
                            <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                              <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                  <td height="50" style="mso-line-height-rule:exactly; line-height:50px; font-size:0;">
                                    &nbsp;
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!-- [if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                  <![endif] -->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- WHAT WE ARE DOING TOP SPACE ENDING -->
          <!-- WHAT WE ARE DOING TITLE STARTS -->
          <repeater>
            <layout label='WHAT WE ARE DOING TITLE STARTS'>
              <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td align="center" style="font-size:0;">
                      <!--[if mso]>
                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                    <tr>
                      <td align="center" valign="top" width="100%" style="max-width:800px;">
                        <![endif]-->
                      <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                        <!-- ID:BG SECTION-1 -->
                        <table align="center" border="0" bgcolor="#000" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                          <tbody>
                            <tr>
                              <td align="center" class="padding">
                                <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                        <![endif]-->
                                <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                                  <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                      <td height="10" style="mso-line-height-rule:exactly; line-height:10px; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:TXT SUBTITLE -->
                                      <td align="center" class="MsoNormal" style="color:#efefef; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:700; font-size:20px; line-height:30px; letter-spacing:1px;">
                                        <multiline> OUR SERVICES </multiline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:BR FOOTER BORDER -->
                                      <td height="10" style="line-height: 10px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:TXT TITLE -->
                                      <td align="center" class="heading" style="color:#fff; padding:0 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-weight:500; font-size:16px; line-height:20px; letter-spacing:1px;">
                                        <!-- <multiline> WHAT WE ARE DOING </multiline> -->
                                        <multiline> Here at Scalelot, we are dedicated to providing cutting-edge IT solutions to enhance your online presence and drive business growth. Our range of services includes </multiline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="15" style="mso-line-height-rule:exactly; line-height:15px; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                  <![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </layout>
          </repeater>
          <!-- WHAT WE ARE DOING TITLE ENDS -->
          <!-- WHAT WE ARE DOING STARTS -->
          <repeater>
            <layout label='WHAT WE ARE DOING STARTS'>
              <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" style="font-size:0;">
                    <!--[if mso]>
                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                  <tr>
                    <td align="center" valign="top" width="800">
                      <![endif]-->
                    <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                      <!-- ID:BG SECTION-1 -->
                      <table align="center" bgcolor="#000" border="0" class="display-width" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px;">
                        <tr>
                          <td align="center" class="padding">
                            <!--[if mso]>
                              <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
                                <tr>
                                  <td align="center" valign="top" width="600">
                                    <![endif]-->
                            <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                              <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                  <td align="center">
                                    <table align="center" border="0" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                                      <tr>
                                        <td align="center" style="font-size:0;">
                                          <!--[if mso]>
                                                  <table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="585">
                                                    <tr>
                                                      <td align="center" valign="top" width="195">
                                                        <![endif]-->
                                          <div style="display:inline-block; max-width:195px; vertical-align:top; width:100%;" class="div-width">
                                            <div style="display:inline-block; max-width:195px; vertical-align:top; width:100%;">
                                              <!-- TABLE LEFT -->
                                              <table align="left" border="0" class="display-width-child" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:100%;">
                                                <tr>
                                                  <td align="center" style="padding:15px 10px;">
                                                    <table align="right" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%">
                                                      <tr>
                                                        <td align="center">
                                                          <table align="center" class="width-center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                              <td align="right">
                                                                <table align="right" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="right" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 682.667 682.667" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><defs><clipPath id="b" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#fff" opacity="1" data-original="#000000" class=""></path></clipPath><clipPath id="c" clipPathUnits="userSpaceOnUse"><path d="M0 512h512V0H0Z" fill="#fff" opacity="1" data-original="#000000" class=""></path></clipPath></defs><mask id="a"><rect width="100%" height="100%" fill="#ffffff" opacity="1" data-original="#ffffff"></rect><path d="M0 0h482v-48.857c0-5.523-4.477-10-10-10H10c-5.523 0-10 4.477-10 10z" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.33333 0 0 -1.33333 20 427.194)" fill="#ffffff" data-original="#ffffff"></path><path d="M0 0h-86.776l-30.002-77.669h146.78z" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.33333 0 0 -1.33333 399.184 519.005)" fill="#ffffff" data-original="#ffffff"></path><path d="M0 0h462c5.523 0 10-4.478 10-10v-265.47H-10V-10C-10-4.478-5.523 0 0 0" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="matrix(1.33333 0 0 -1.33333 33.333 59.901)" fill="#ffffff" data-original="#ffffff"></path><path d="M0 0h-542.004" style="fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 702.67 429.86)" data-original="#000000"></path><path d="M0 0h-542.004" style="fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 702.67 545.869)" data-original="#000000"></path><path d="m0 0-57.307-56.311L0-113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 236.37 149.135)" data-original="#000000"></path><path d="m0 0 57.307 56.311L0 113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 446.297 300.625)" data-original="#000000"></path><path d="m0 0-40.291-113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 362.544 149.135)" data-original="#000000"></path><path d="M0 0v-99.975" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 408.027 693.331)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path><path d="M0 0v99.975" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="matrix(1.33333 0 0 -1.33333 545.538 826.631)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path></mask><g mask="url(#a)"><g clip-path="url(#b)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0h205.422" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(153.29 44.926)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path><path d="M0 0h482v-48.857c0-5.523-4.477-10-10-10H10c-5.523 0-10 4.477-10 10z" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="translate(15 191.605)" fill="#fff" data-original="#000000" class=""></path><path d="M0 0h482v-48.857c0-5.523-4.477-10-10-10H10c-5.523 0-10 4.477-10 10z" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(15 191.605)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path><path d="M0 0h-86.776l-30.002-77.669h146.78z" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="translate(299.388 122.747)" fill="#fff" data-original="#000000" class=""></path><path d="M0 0h-86.776l-30.002-77.669h146.78z" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(299.388 122.747)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path><path d="M0 0h462c5.523 0 10-4.478 10-10v-265.47H-10V-10C-10-4.478-5.523 0 0 0" style="fill-opacity:1;fill-rule:nonzero;stroke:none" transform="translate(25 467.074)" fill="#fff" data-original="#000000" class=""></path><path d="M0 0h462c5.523 0 10-4.478 10-10v-265.47H-10V-10C-10-4.478-5.523 0 0 0z" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(25 467.074)" fill="none" stroke="#000000" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#000000" class=""></path><path d="M0 0h-542.004" style="fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(527.002 189.605)" data-original="#000000"></path><path d="M0 0h-542.004" style="fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(527.002 102.599)" data-original="#000000"></path><path d="m0 0-57.307-56.311L0-113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(177.277 400.149)" data-original="#000000"></path><path d="m0 0 57.307 56.311L0 113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(334.723 286.531)" data-original="#000000"></path><path d="m0 0-40.291-113.618" style="fill-opacity:1;fill-rule:nonzero;stroke:#ffffff;stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(271.908 400.149)" data-original="#000000"></path></g><g clip-path="url(#c)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)"><path d="M0 0v-99.975" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(306.02 -7.998)" fill="none" stroke="#ffffff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#ffffff"></path><path d="M0 0v99.975" style="stroke-width:30;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;stroke-dasharray:none;stroke-opacity:1" transform="translate(409.154 -107.974)" fill="none" stroke="#ffffff" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-dasharray="none" stroke-opacity="" data-original="#ffffff"></path></g></g></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="right" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:1px;">
                                                                      <multiline><a href="#" style="color:#fff; text-decoration:none;">Website Design & Development</a></multiline>
                                                                   </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td height="30" class="height20" style="line-height:30px; mso-line-height-rule:exactly; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="right">
                                                                <table align="right" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="right" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline> 
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 53 53" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M7 7h31.87v4.7h4V6.22c0-1.78-1.45-3.22-3.22-3.22H6.22C4.44 3 3 4.44 3 6.22V30.6c0 1.78 1.44 3.23 3.22 3.23h18.7v-5.48H7zm15.93 23.09h.01c.55 0 1 .44 1 1 0 .55-.45 1-1 1s-1.01-.45-1.01-1c0-.56.45-1 1-1zM15.45 40.43h-1.46c-.55 0-1 .45-1 1s.45 1 1 1h10.93v-6.6h-6.36c.46 1.24-.08 2.33-3.11 4.6z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="M46 13.7H30.92c-2.21 0-4 1.79-4 4V46c0 2.21 1.79 4 4 4H46c2.21 0 4-1.79 4-4V17.7c0-2.21-1.79-4-4-4zm-6.85 32.79h-1.38c-.56 0-1-.45-1-1 0-.56.44-1 1-1h1.38c.56 0 1 .44 1 1 0 .55-.44 1-1 1zm8.35-4.52H29.43V17.81c0-.69.56-1.26 1.25-1.26h15.56c.69 0 1.26.57 1.26 1.26v24.16zM23.52 13.21l-5.69-4.24a1.02 1.02 0 0 0-1.2 0l-5.68 4.24c-.26.19-.41.49-.41.8 0 .32.15.61.41.8l5.68 4.24c.18.13.39.2.6.2s.42-.07.6-.2l5.69-4.24c.26-.18.41-.48.41-.8 0-.31-.15-.61-.41-.8z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="m22.02 18.42-2.99 2.23c-.56.4-1.17.6-1.8.6s-1.25-.2-1.77-.58l-3.02-2.25-1.5 1.11c-.25.19-.4.49-.4.8 0 .32.15.62.4.81l5.69 4.24c.18.13.39.19.6.19s.42-.06.6-.19l5.7-4.24a1 1 0 0 0-.01-1.61zM37.962 29.744a.825.825 0 0 0 .985 0l4.445-3.308a.825.825 0 0 0 0-1.323l-4.445-3.308a.825.825 0 0 0-.985 0l-4.436 3.308a.825.825 0 0 0 0 1.323z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="m42.03 29.95-1.89 1.4c-.49.36-1.07.56-1.68.56-.62 0-1.2-.2-1.69-.56l-1.88-1.4-1.71 1.27c-.27.2-.27.6 0 .81l4.97 3.7c.18.13.43.13.61 0l4.98-3.7c.27-.21.27-.61 0-.81z" fill="#fff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="right" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:1px;">
                                                                       <multiline><a href="#" style="color:#fff; text-decoration:none;">UI/UX Design</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td height="30" class="height20" style="line-height:30px; mso-line-height-rule:exactly; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="right">
                                                                <table align="right" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="right" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 500 500" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M148.75 57.55c0-27.02 20.72-39.33 39.97-39.33s39.97 12.31 39.97 39.33-20.72 39.33-39.97 39.33-39.97-12.31-39.97-39.33zm-24.33 328.01c29.93 0 62.14-19.28 62.14-61.6v-84.65c0-42.32-32.21-61.6-62.14-61.6s-62.14 19.28-62.14 61.6v1.83h50.49c3.98 0 7.2 3.22 7.2 7.2s-3.22 7.2-7.2 7.2H62.28v18.89h50.49c3.98 0 7.2 3.22 7.2 7.2s-3.22 7.2-7.2 7.2H62.28v18.89h50.49c3.98 0 7.2 3.22 7.2 7.2s-3.22 7.2-7.2 7.2H62.28v1.83c0 42.34 32.21 61.61 62.14 61.61zm168.13-288.8c23.67 0 49.14-15.14 49.14-48.38S316.22 0 292.55 0s-49.14 15.14-49.14 48.38 25.48 48.38 49.14 48.38zm-38.56 65.3v51.02l44.18-25.51zm-77.13 20.25c-13.85-12.22-32.41-18.96-52.27-19v-51.39h246.56v151.31H200.96v-23.92c0-23.38-8.33-43.09-24.1-57zm62.72 43.25a7.21 7.21 0 0 0 7.2 7.21c1.24 0 2.49-.32 3.6-.97l65.79-37.98c2.23-1.29 3.6-3.66 3.6-6.24s-1.37-4.95-3.6-6.24l-65.79-37.98c-2.23-1.29-4.97-1.29-7.2 0s-3.6 3.66-3.6 6.24zm207.46-53.68c0-3.98 3.22-7.2 7.2-7.2s7.2 3.22 7.2 7.2v75.09c0 .69-.1 1.36-.29 1.99l17.71 8.71v-140.2l-93.32 45.91v48.37l61.49 30.26v-70.13zm-72.93 194.09c-21.12 0-43.84 13.51-43.84 43.16s22.73 43.16 43.84 43.16c21.12 0 43.84-13.51 43.84-43.16.01-29.66-22.72-43.16-43.84-43.16zm119.16-18.71v130.61c0 12.2-9.93 22.13-22.13 22.13H277.09c-12.2 0-22.13-9.93-22.13-22.13V347.26c0-12.2 9.93-22.13 22.13-22.13h36.57c4.26 0 7.73-3.47 7.73-7.73v-6.13c0-12.2 9.93-22.13 22.13-22.13h61.2c12.2 0 22.13 9.93 22.13 22.13v6.13c0 4.26 3.47 7.73 7.73 7.73h36.57c12.19 0 22.12 9.93 22.12 22.13zm-60.91 61.86c0-37.79-29.3-57.56-58.25-57.56s-58.25 19.77-58.25 57.56 29.3 57.56 58.25 57.56c28.95.01 58.25-19.77 58.25-57.56zm-197.45-90.3c-3.98 0-7.2 3.22-7.2 7.2 0 56.95-46.33 103.28-103.29 103.28-56.95 0-103.29-46.33-103.29-103.28 0-3.98-3.22-7.2-7.2-7.2s-7.2 3.22-7.2 7.2c0 62.47 48.94 113.73 110.49 117.46v40.95c0 .4.04.79.1 1.17H82.35c-3.98 0-7.2 3.22-7.2 7.2s3.22 7.2 7.2 7.2h84.13c3.98 0 7.2-3.22 7.2-7.2s-3.22-7.2-7.2-7.2h-34.97c.06-.38.1-.77.1-1.17v-40.95c61.55-3.73 110.49-54.99 110.49-117.46.01-3.98-3.22-7.2-7.19-7.2z" fill="#fff" opacity="1" data-original="#000000"></path></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="right" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; Letter-spacing:1px;">
                                                                       <multiline><a href="#" style="color:#fff; text-decoration:none;">Content Creation</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </div>
                                          <!--[if mso]>
                                                      </td>
                                                      <td align="center" valign="top" width="195">
                                                        <![endif]-->
                                          <div style="display:inline-block; max-width:195px; vertical-align:top; width:100%;" class="div-width">
                                            <!--TABLE LEFT-->
                                            <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="display-width-child" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;">
                                              <tr>
                                                <td align="left" style="padding:15px 10px;">
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" style="width:auto !important;">
                                                    <tr>
                                                      <td align="center" style="color:#666666;" width="175">
                                                         <img src="https://user-assets-unbounce-com.s3.amazonaws.com/558e04ab-9e3d-4116-b0e8-648f55779199/5f00f3b5-20cb-422b-b3d4-3f09e8b5bad7/services.original.jpg" alt="175x225" width="175" height="225" style="margin:0; border:0; padding:0; width:100%; max-width:100%; display:block;object-fit: cover;" editable="true" label="175x225">
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </td>
                                              </tr>
                                            </table>
                                          </div>
                                          <!--[if mso]>
                                                      </td>
                                                      <td align="center" valign="top" width="195">
                                                        <![endif]-->
                                          <div style="display:inline-block; max-width:195px; vertical-align:top; width:100%;" class="div-width">
                                            <div style="display:inline-block; max-width:195px; vertical-align:top; width:100%;">
                                              <!-- TABLE RIGHT -->
                                              <table align="right" border="0" class="display-width-child" cellspacing="0" cellpadding="0" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:100%;">
                                                <tr>
                                                  <td align="center" style="padding:15px 10px;">
                                                    <table align="right" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%">
                                                      <tr>
                                                        <td align="center">
                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                              <td align="left">
                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="left" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 68 68" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M42.876 52.506v1.585H13.472v-42.24h29.404V23.94a2.879 2.879 0 0 1 1.23-.266h2.205V6.418c0-2.107-1.772-3.918-3.928-3.918H13.955a3.928 3.928 0 0 0-3.918 3.918v55.164a3.922 3.922 0 0 0 3.918 3.918h28.428a3.936 3.936 0 0 0 3.928-3.918V52.9h-1.959a2.88 2.88 0 0 1-1.476-.394zM25.669 6.191h5c.552 0 .985.443.985.985s-.433.984-.985.984h-5c-.542 0-.985-.443-.985-.984s.443-.985.985-.985zm5.758 54.958h-6.516a.98.98 0 0 1-.985-.984c0-.542.443-.985.985-.985h6.516c.552 0 .985.443.985.985a.975.975 0 0 1-.985.984z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="M34.246 27.303a.984.984 0 0 0 1.392-.007l4.114-4.152a.984.984 0 0 0 0-1.386l-4.114-4.152a.985.985 0 0 0-1.399 1.385l3.428 3.46-3.428 3.46a.984.984 0 0 0 .007 1.392zM22.096 17.6a.982.982 0 0 0-1.392.006l-4.113 4.152a.984.984 0 0 0 0 1.386l4.113 4.152a.984.984 0 1 0 1.399-1.385l-3.427-3.46 3.427-3.46a.984.984 0 0 0-.007-1.392zM29.758 14.818l-5.778 14.54a.984.984 0 1 0 1.83.726l5.778-14.54a.984.984 0 1 0-1.83-.726zM57.047 36.042l-2.162-.244a9.5 9.5 0 0 0-1.105-2.627v-.008l1.279-1.803c.29-.41.244-.971-.112-1.327l-1.549-1.548a1.032 1.032 0 0 0-1.374-.077l-1.696 1.354a9.533 9.533 0 0 0-2.644-1.07l-.368-2.19a1.032 1.032 0 0 0-1.019-.862h-2.195c-.526 0-.967.395-1.026.917l-.245 2.17a9.774 9.774 0 0 0-2.626 1.105l-1.81-1.286a1.032 1.032 0 0 0-1.329.113l-1.542 1.547c-.37.372-.404.962-.077 1.372l1.357 1.706a9.295 9.295 0 0 0-1.078 2.644l-2.183.368c-.497.084-.86.514-.86 1.018v2.188c0 .525.394.967.915 1.026l2.154.244c.244.94.618 1.826 1.113 2.635v.009l-1.276 1.793c-.292.41-.245.973.11 1.329l1.55 1.549c.37.37.962.404 1.372.077l1.706-1.356a9.588 9.588 0 0 0 2.635 1.07l.368 2.19c.084.498.514.862 1.018.862h2.196c.525 0 .967-.395 1.026-.917l.244-2.17a9.247 9.247 0 0 0 2.627-1.105l1.81 1.286c.41.292.973.244 1.329-.113l1.542-1.548c.37-.371.404-.96.077-1.371l-1.35-1.698a9.699 9.699 0 0 0 1.07-2.652l2.183-.368c.497-.084.861-.514.861-1.018v-2.188c0-.525-.394-.967-.916-1.026zm-11.72 6.487a4.244 4.244 0 0 1-4.244-4.244 4.25 4.25 0 0 1 4.244-4.244 4.242 4.242 0 0 1 4.235 4.244 4.237 4.237 0 0 1-4.235 4.244z" fill="#fff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="left" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:1px;">
                                                                       <multiline><a href="#" style="color:#fff; text-decoration:none;">Mobile Application Development</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td height="30" class="height20" style="line-height:30px; mso-line-height-rule:exactly; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="left">
                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="left" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline> 
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 64 64" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><g data-name="media-monitor-screen-Digital Marketing"><path d="M59 15h-2v-1h1a3 3 0 0 0 0-6h-1V3a.968.968 0 0 0-.41-.8.991.991 0 0 0-.88-.16L42.85 6H36a1 1 0 0 0-1 1v1h-2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h2v1h-6V6a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v9H5a3.009 3.009 0 0 0-3 3v32a3.009 3.009 0 0 0 3 3h23v3h-6a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-6v-3h23a3.009 3.009 0 0 0 3-3V18a3.009 3.009 0 0 0-3-3zm-2-5h1a1 1 0 0 1 0 2h-1zM44 7.74l11-3.39v13.3l-11-3.39zM37 8h5v6h-5zm2.85 8-.72 5H38v-5zM34 12v-2h1v2zM9 7h18v14H9zm32 51v2H23v-2zm-11-2v-3h4v3zm30-6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-1h56zm0-3H4V18a1 1 0 0 1 1-1h2v5a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1v-5h7v5a1 1 0 0 0 1 1h3a1 1 0 0 0 .99-.86l.88-6.14h.98l12.86 3.96A.925.925 0 0 0 56 20a1.015 1.015 0 0 0 1-1v-2h2a1 1 0 0 1 1 1z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="M7 45h26a1 1 0 0 0 1-1V28a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1zm1-2V29.789l11.476 7.063a1 1 0 0 0 1.048 0L32 29.789V43zm2.533-14h18.934L20 34.826zM37 39h2v3a1 1 0 0 0 1 1h17a1 1 0 0 0 1-1V30a1 1 0 0 0-1-1h-1v-3a1 1 0 0 0-1-1H37a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1zm19 2H41V31h15zM38 27h16v2H40a1 1 0 0 0-1 1v7h-1z" fill="#fff" opacity="1" data-original="#000000" class=""></path><path d="M43 33h2v2h-2zM47 33h7v2h-7zM43 37h4v2h-4zM49 37h5v2h-5zM15.474 17.851a1 1 0 0 0 .973.044l6-3a1 1 0 0 0 0-1.79l-6-3A1 1 0 0 0 15 11v6a1 1 0 0 0 .474.851zM17 12.618 19.764 14 17 15.382z" fill="#fff" opacity="1" data-original="#000000" class=""></path></g></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="left" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:1px;">
                                                                       <multiline><a href="#" style="color:#fff; text-decoration:none;">Digital Marketing</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td height="30" class="height20" style="line-height:30px; mso-line-height-rule:exactly; font-size:0;">
                                                                &nbsp;
                                                              </td>
                                                            </tr>
                                                            <tr>
                                                              <td align="left">
                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                  <tr>
                                                                    <!-- ID:TXT CONTENT -->
                                                                    <td align="left" class="MsoNormal txt-center" style="color:#666666; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; line-height:24px; font-weight:400;">
                                                                      <!-- <multiline> Integer et dapibus nibh. Vestibulum ante ipsum. </multiline> -->
                                                                      <multiline>
                                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="25" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path fill-rule="evenodd" d="M142.745 498.118c-6.904 0-12.5-5.596-12.5-12.5s5.596-12.5 12.5-12.5h48.027c3.358-19.031 4.854-40.095 3.23-58.994H45.321c-19.508 0-35.32-15.813-35.32-35.321V96.381c0-19.508 15.812-35.32 35.32-35.32h166.182l1.108-1.918 57.663 33.291L192.64 226.9l-57.663-33.291L198.801 83.06H45.321C37.956 83.06 32 89.016 32 96.381v241.611h448V96.381c0-7.365-5.956-13.321-13.321-13.321H294.038l-71.427-41.239 6.517-11.288c9.193-15.923 29.554-21.379 45.477-12.186 15.015 8.669 20.72 27.268 13.614 42.713H466.68c19.508 0 35.32 15.812 35.32 35.32v282.422c0 19.508-15.813 35.321-35.321 35.321H316.867c-1.586 18.9.17 39.963 3.79 58.994h48.171c6.904 0 12.5 5.596 12.5 12.5s-5.596 12.5-12.5 12.5H142.745zm247.849-285.129c0-5.519-4.467-10-10-10H277.006c-5.524 0-10 4.481-10 10s4.477 10 10 10h103.588c5.533.001 10-4.481 10-10zm-239.008 43.386 26.053-15.042-47.663-27.518v42.662c-4.846.694-8.571 4.861-8.571 9.898 0 5.523 4.477 10 10 10h249.188c5.523 0 10-4.477 10-10s-4.477-10-10-10z" clip-rule="evenodd" fill="#fff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                                      </multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="line-height:5px; mso-line-height-rule:exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:TXT HEADING -->
                                                                    <td align="left" class="heading txt-center" style="color:#333333; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:16px; font-weight:500; letter-spacing:1px;">
                                                                       <multiline><a href="#" style="color:#fff; text-decoration:none;">Content Writing</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </td>
                                                      </tr>
                                                    </table>
                                                  </td>
                                                </tr>
                                              </table>
                                            </div>
                                          </div>
                                          <!--[if mso]>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                  <![endif]-->
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                              <![endif]-->
                          </td>
                        </tr>
                      </table>
                    </div>
                    <!--[if mso]>
                    </td>
                  </tr>
                </table>
                <![endif]-->
                  </td>
                </tr>
              </table>
            </layout>
          </repeater>
          <!-- WHAT WE ARE DOING ENDS -->
          <!-- WHAT WE ARE DOING BOTTOM SPACE BEGINING -->
          <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td align="center" style="font-size:0;">
                <!--[if mso]>
                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                  <tr>
                    <td align="center" valign="top" width="800">
                      <![endif]-->
                <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                  <!-- ID:BG SECTION-1 -->
                  <table align="center" bgcolor="#000" border="0" class="display-width" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px;">
                    <tr>
                      <td align="center" class="padding">
                        <!--[if mso]>
                              <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width: 600px;">
                                <tr>
                                  <td align="center" valign="top" width="600">
                                    <![endif]-->
                        <div style="display:inline-block;width:100%; max-width:600px; vertical-align:top;" class="main-width">
                          <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                            <tr>
                              <td height="45" style="mso-line-height-rule: exactly; line-height:45px; font-size:0;">
                                &nbsp;
                              </td>
                            </tr>
                          </table>
                        </div>
                        <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
                              <![endif]-->
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso]>
                    </td>
                  </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
          </table>
          <!-- WHAT WE ARE DOING BOTTOM SPACE ENDING -->
          <!-- ABOUT US STARTS -->
          <repeater>
            <layout label='ABOUT US STARTS'>
              <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td align="center" style="font-size:0;">
                      <!--[if mso]>
                    <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                      <tr>
                        <td align="center" valign="top" width="100%" style="max-width:800px;">
                          <![endif]-->
                      <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                        <!-- ID:BG SECTION-3 -->
                        <table align="center" bgcolor="#fff" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                          <tr>
                            <td align="center">
                              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                <tr>
                                  <td align="left" class="res-padding-full">
                                    <!--[if mso]>
                                            <table border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width:800px;">
                                              <tr>
                                                <td width="700">
                                                  <![endif]-->
                                    <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" class="display-width width768" style="max-width:700px;">
                                      <tr>
                                        <td>
                                          <table align="center" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%">
                                            <tr>
                                              <td align="left" style="font-size:0;">
                                                <!--[if mso]>
                                                              <table  aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="100%">
                                                                <tr>
                                                                  <td align="center" valign="top" width="400">
                                                                    <![endif]-->
                                                <div style="display:inline-block; width:100%; max-width:400px; vertical-align:top;" class="div-width child1-width">
                                                  <!--TABLE LEFT -->
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:100%;">
                                                    <tr>
                                                      <td align="left" class="res-center">
                                                        <table align="left" border="0" cellpadding="0" width="100%" cellspacing="0">
                                                          <tr>
                                                            <td align="left" class="res-height20-bottom">
                                                              <table align="left" border="0" cellpadding="0" width="100%" cellspacing="0" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; width:auto !important;">
                                                                <tr>
                                                                  <td align="left" width="400" style="color:#ffffff; font-size:0;">
                                                                     <img src="https://user-assets-unbounce-com.s3.amazonaws.com/558e04ab-9e3d-4116-b0e8-648f55779199/d3b5b457-ea67-4e2c-9fe4-ad0b6d8ee80c/about-us.original.jpg" alt="400x420" style="margin:0; border:0; padding:0; width:100%; max-width:100%;max-height: 420px;height: 100%; display:block; height:auto;object-fit: cover;overflow: hidden;" editable="true" label="400x420">
                                                                  </td>
                                                                </tr>
                                                              </table>
                                                            </td>
                                                          </tr>
                                                        </table>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </div>
                                                <!--[if mso]>
                                                                  </td>
                                                                  <td align="center" valign="top" width="300">
                                                                  <![endif]-->
                                                <div style="display:inline-block; max-width:300px; width:100%; vertical-align:top;" class="div-width child2-width">
                                                  <!--TABLE RIGHT -->
                                                  <table align="center" border="0" cellpadding="0" cellspacing="0" class="display-width-child" width="100%" style="border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; max-width:100%; width:100%;">
                                                    <tr>
                                                      <td align="center" class="res-padding-right padding-hide">
                                                        <div style="display:inline-block; max-width:300px; width:100%; vertical-align:top;" class="div-width">
                                                          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                            <tr>
                                                              <td align="center" class="full-width-height padding-hide res-attract-height" style="padding:60px 20px;">
                                                                <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt; mso-table-rspace:0pt; width:100%; max-width:100%;">
                                                                  <tr>
                                                                    <!-- ID:TXT ABT HEADING -->
                                                                    <td align="left" class="heading txt-center" style="color:#ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:20px; line-height:30px; font-weight:500; letter-spacing:1px;">
                                                                       <multiline><a href="#" style="text-decoration:none; color:#000;">ABOUT US</a></multiline>
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:BR FOOTER BORDER -->
                                                                    <td height="15" style="line-height: 15px; mso-line-height-rule: exactly; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <td height="5" style="mso-line-height-rule:exactly; line-height:5px; font-size:0;">
                                                                      &nbsp;
                                                                    </td>
                                                                  </tr>
                                                                  <tr>
                                                                    <!-- ID:BR ABT LEFT BORDER -->
                                                                    <td class="hide-border" style="border-left:3px solid #000; padding-left:15px;">
                                                                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                                        <tr>
                                                                          <!-- ID:TXT ABT SUBCONTENT -->
                                                                          <td align="left" class="MsoNormal txt-center" style="color:#000; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:600; line-height:24px; letter-spacing:1px;">
                                                                            <multiline>As a valued member of our community, you will now regularly receive updates and insights from Scalelot Technologies. We're here to assist you in achieving your online goals, so feel free to reach out to us for any inquiries or assistance.</multiline>
                                                                          </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <td height="5" style="mso-line-height-rule: exactly; line-height:5px; font-size:0;">
                                                                            &nbsp;
                                                                          </td>
                                                                        </tr>
                                                                        <tr>
                                                                          <!-- ID:TXT ABT AUTHOR -->
                                                                          <td align="left" class="MsoNormal txt-center" style="color:#110f0f; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:600; line-height:24px; letter-spacing:1px;">
                                                                            <multiline> JOHN PETER, CEO </multiline>
                                                                          </td>
                                                                        </tr>
                                                                      </table>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                              </td>
                                                            </tr>
                                                          </table>
                                                        </div>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </div>
                                                <!--[if mso]>
                                                                  </td>
                                                                </tr>
                                                              </table>
                                                              <![endif]-->
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                                </td>
                                                <td width="100">&nbsp;</td>
                                              </tr>
                                            </table>
                                          <![endif]-->
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </div>
                      <!--[if mso]>
                        </td>
                      </tr>
                    </table>
                  <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </layout>
          </repeater>
          <!-- ABOUT US ENDS -->
          <!-- OUR CLIENTS TOP SPACE BEGINING -->
          <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td align="center" style="font-size:0;">
                  <!--[if mso]>
                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                    <tr>
                      <td align="center" valign="top" width="100%" style="max-width:800px;">
                        <![endif]-->
                  <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                    <!-- ID:BG SECTION-1 -->
                    <table align="center" border="0" bgcolor="#000" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                      <tbody>
                        <tr>
                          <td align="center" class="padding">
                            <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                        <![endif]-->
                            <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                              <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                  <td height="50" style="mso-line-height-rule:exactly; line-height:50px; font-size:0;">
                                    &nbsp;
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                  <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- OUR CLIENTS TOP SPACE ENDING -->
          <!-- FOOTER STARTS -->
          <repeater>
            <layout label='FOOTER STARTS'>
              <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tbody>
                  <tr>
                    <td align="center" style="font-size:0;">
                      <!--[if mso]>
                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                    <tr>
                      <td align="center" valign="top" width="100%" style="max-width:800px;">
                        <![endif]-->
                      <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                        <!-- ID:BG FOOTER -->
                        <table align="center" border="0" bgcolor="#000" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                          <tbody>
                            <tr>
                              <td align="center" class="padding">
                                <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                          <![endif]-->
                                <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                                  <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                    <tr>
                                      <td  style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:400; line-height:24px; letter-spacing:1px;">
                                        <span>Best regards,</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td  style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:18px; font-weight:600; line-height:24px; letter-spacing:1px;">
                                        <span>Scalelot Technologies</span>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>
                                        <!-- FOOTER TOP SPACE BEGINING -->
                                        <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="center" style="font-size:0;">
                                                <!--[if mso]>
                                                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                                                  <tr>
                                                    <td align="center" valign="top" width="100%" style="max-width:800px;">
                                                      <![endif]-->
                                                <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                                                  <!-- ID:BG FOOTER -->
                                                  <table align="center" bgcolor="#000" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                                                    <tbody>
                                                      <tr>
                                                        <td align="center" class="padding">
                                                          <!--[if mso]>
                                                                <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                                                  <tr>
                                                                    <td align="center">
                                                                      <![endif]-->
                                                          <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                                                            <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                                              <tr>
                                                                <td height="40" style="mso-line-height-rule:exactly; line-height:40px; font-size:0;">
                                                                  &nbsp;
                                                                </td>
                                                              </tr>
                                                            </table>
                                                          </div>
                                                          <!--[if mso]>
                                                                    </td>
                                                                  </tr>
                                                                </table>
                                                                <![endif]-->
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                                <!--[if mso]>
                                                    </td>
                                                  </tr>
                                                </table>
                                                <![endif]-->
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <!-- FOOTER TOP SPACE ENDING -->
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center">
                                        <table align="center" border="0" cellspacing="0" cellpadding="0" style="width:auto !important;">
                                          <tr>
                                            <!-- ID:TXT FOOTER ADDRESS -->
                                            <td align="left" valign="middle" width="48">
                                               <a href="https://www.facebook.com/scalelottech/" style="display: block; border-radius: 100%;overflow: hidden; text-decoration:none;">
                                                <span style="display: block;width: 48px;height: 48px;background-image: linear-gradient(180deg, #E1BEBE 0%, #ee332b 100%);">
                                                  <table width="100%" height="100%">
                                                    <tr>
                                                      <td style="text-align: center;">
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M40.4 55.2h-9.9c-1.6 0-2.1-.6-2.1-2.1V41c0-1.6.6-2.1 2.1-2.1h9.9v-8.8c0-4 .7-7.8 2.7-11.3 2.1-3.6 5.1-6 8.9-7.4 2.5-.9 5-1.3 7.7-1.3h9.8c1.4 0 2 .6 2 2v11.4c0 1.4-.6 2-2 2-2.7 0-5.4 0-8.1.1-2.7 0-4.1 1.3-4.1 4.1-.1 3 0 5.9 0 9h11.6c1.6 0 2.2.6 2.2 2.2V53c0 1.6-.5 2.1-2.2 2.1H57.3v32.6c0 1.7-.5 2.3-2.3 2.3H42.5c-1.5 0-2.1-.6-2.1-2.1V55.2z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </span>
                                              </a>
                                            </td>
                                            <td width="20">
                                            </td>
                                            <td align="left" valign="middle" width="48">
                                               <a href="https://twitter.com/" style="display: block; border-radius: 100%;overflow: hidden; text-decoration:none;">
                                                <span style="display: block;width: 48px;height: 48px;background-image: linear-gradient(180deg, #E1BEBE 0%, #ee332b 100%);">
                                                  <table width="100%" height="100%">
                                                    <tr>
                                                      <td style="text-align: center;">
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" x="0" y="0" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M21.534 7.113A9.822 9.822 0 0 0 24 4.559v-.001c-.893.391-1.843.651-2.835.777a4.894 4.894 0 0 0 2.165-2.719 9.845 9.845 0 0 1-3.12 1.191 4.919 4.919 0 0 0-8.511 3.364c0 .39.033.765.114 1.122-4.09-.2-7.71-2.16-10.142-5.147a4.962 4.962 0 0 0-.674 2.487c0 1.704.877 3.214 2.186 4.089A4.863 4.863 0 0 1 .96 9.116v.054a4.943 4.943 0 0 0 3.942 4.835c-.401.11-.837.162-1.29.162-.315 0-.633-.018-.931-.084.637 1.948 2.447 3.381 4.597 3.428a9.89 9.89 0 0 1-6.101 2.098c-.403 0-.79-.018-1.177-.067a13.856 13.856 0 0 0 7.548 2.208c8.683 0 14.342-7.244 13.986-14.637z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </span>
                                              </a>
                                            </td>
                                            <td width="20">
                                            </td>
                                            <td align="left" valign="middle" width="48">
                                               <a href="https://www.linkedin.com/company/scalelot-technologies/?originalSubdomain=in" style="display: block; border-radius: 100%;overflow: hidden; text-decoration:none;">
                                                <span style="display: block;width: 48px;height: 48px;background-image: linear-gradient(180deg, #E1BEBE 0%, #ee332b 100%);">
                                                  <table width="100%" height="100%">
                                                    <tr>
                                                      <td style="text-align: center;">
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M90 90V60.7c0-14.4-3.1-25.4-19.9-25.4-8.1 0-13.5 4.4-15.7 8.6h-.2v-7.3H38.3V90h16.6V63.5c0-7 1.3-13.7 9.9-13.7 8.5 0 8.6 7.9 8.6 14.1v26H90zM11.3 36.6h16.6V90H11.3zM19.6 10c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.7 9.6 9.7 9.6-4.4 9.6-9.7-4.3-9.6-9.6-9.6z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </span>
                                              </a>
                                            </td>
                                            <td width="20">
                                            </td>
                                            <td align="left" valign="middle" width="48">
                                               <a href="https://www.instagram.com/scalelot_technologies/" style="display: block; border-radius: 100%;overflow: hidden; text-decoration:none;">
                                                <span style="display: block;width: 48px;height: 48px;background-image: linear-gradient(180deg, #E1BEBE 0%, #ee332b 100%);">
                                                  <table width="100%" height="100%">
                                                    <tr>
                                                      <td style="text-align: center;">
                                                        <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M40.4 55.2h-9.9c-1.6 0-2.1-.6-2.1-2.1V41c0-1.6.6-2.1 2.1-2.1h9.9v-8.8c0-4 .7-7.8 2.7-11.3 2.1-3.6 5.1-6 8.9-7.4 2.5-.9 5-1.3 7.7-1.3h9.8c1.4 0 2 .6 2 2v11.4c0 1.4-.6 2-2 2-2.7 0-5.4 0-8.1.1-2.7 0-4.1 1.3-4.1 4.1-.1 3 0 5.9 0 9h11.6c1.6 0 2.2.6 2.2 2.2V53c0 1.6-.5 2.1-2.2 2.1H57.3v32.6c0 1.7-.5 2.3-2.3 2.3H42.5c-1.5 0-2.1-.6-2.1-2.1V55.2z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg> -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" x="0" y="0" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><circle cx="256" cy="256" r="52.5" fill="#ffffff" opacity="1" data-original="#000000" class=""></circle><path d="M256 6C117.929 6 6 117.929 6 256s111.929 250 250 250 250-111.929 250-250S394.071 6 256 6zm154.458 313.54c-1.2 23.768-7.879 47.206-25.2 64.343-17.489 17.3-41.038 23.746-65.035 24.934H191.778c-24-1.188-47.546-7.63-65.035-24.934-17.322-17.137-24-40.575-25.2-64.343V192.46c1.2-23.768 7.879-47.206 25.2-64.344 17.489-17.3 41.038-23.746 65.035-24.933h128.444c24 1.187 47.546 7.63 65.035 24.933 17.322 17.138 24 40.576 25.2 64.344z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path><path d="M318.6 132.138c-31.286-.858-93.906-.858-125.192 0-16.281.447-34.738 4.5-46.338 16.89-12.054 12.879-16.609 28.439-17.071 45.846-.812 30.552 0 122.252 0 122.252.529 17.405 5.017 32.967 17.071 45.846 11.6 12.394 30.057 16.443 46.338 16.89 31.286.858 93.906.858 125.192 0 16.281-.447 34.738-4.5 46.338-16.89 12.054-12.879 16.609-28.439 17.071-45.846V194.874c-.462-17.407-5.017-32.967-17.071-45.846-11.604-12.394-30.061-16.443-46.338-16.89zM256 337.375A81.375 81.375 0 1 1 337.375 256 81.375 81.375 0 0 1 256 337.375zm81.721-145.953A16.275 16.275 0 1 1 354 175.147a16.275 16.275 0 0 1-16.279 16.275z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </span>
                                              </a>
                                            </td>
                                            </td>
                                            <td width="20">
                                            </td>
                                            <td align="left" valign="middle" width="48">
                                               <a href="https://dribbble.com/scalelot" style="display: block; border-radius: 100%;overflow: hidden; text-decoration:none;">
                                                <span style="display: block;width: 48px;height: 48px;background-image: linear-gradient(180deg, #E1BEBE 0%, #ee332b 100%);">
                                                  <table width="100%" height="100%">
                                                    <tr>
                                                      <td style="text-align: center;">
                                                        <!-- <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25px" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M40.4 55.2h-9.9c-1.6 0-2.1-.6-2.1-2.1V41c0-1.6.6-2.1 2.1-2.1h9.9v-8.8c0-4 .7-7.8 2.7-11.3 2.1-3.6 5.1-6 8.9-7.4 2.5-.9 5-1.3 7.7-1.3h9.8c1.4 0 2 .6 2 2v11.4c0 1.4-.6 2-2 2-2.7 0-5.4 0-8.1.1-2.7 0-4.1 1.3-4.1 4.1-.1 3 0 5.9 0 9h11.6c1.6 0 2.2.6 2.2 2.2V53c0 1.6-.5 2.1-2.2 2.1H57.3v32.6c0 1.7-.5 2.3-2.3 2.3H42.5c-1.5 0-2.1-.6-2.1-2.1V55.2z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg> -->
                                                        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" x="0" y="0" viewBox="0 0 100 100" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M62 53.6c3.9 9.9 6.8 20.1 8.7 30.6 2.7-1.6 5.2-3.6 7.5-5.9 6-6 9.8-13.5 11.2-21.6-5.9-2.4-12.3-3.8-19-3.8-2.8 0-5.6.2-8.4.7zM78.3 21.8c0-.1 0-.1 0 0C70.7 14.2 60.7 10 50 10c-4.2 0-8.3.6-12.1 1.9 6.2 7.8 11.7 16.1 16.3 24.8C63 33 71.1 27.9 78.3 21.8zM81.5 25.3c-7.6 6.5-16 11.7-25.1 15.6 1.3 2.7 2.6 5.5 3.8 8.3 3.4-.6 6.8-1 10.3-1 6.7 0 13.3 1.2 19.5 3.6V50c0-9.1-3-17.7-8.5-24.7zM25.4 81.5C32.4 87 41 90 50 90c5.7 0 11.3-1.2 16.4-3.5-1.9-11-5-21.7-9-31.9-14.2 3.9-25.9 13.9-32 26.9z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path><path d="M49.2 52.5c2.1-.9 4.2-1.6 6.3-2.2-1.1-2.6-2.3-5.1-3.6-7.6-10.8 4-22.2 6-33.8 6-2.7 0-5.4-.1-8.1-.3V50c0 10.7 4.2 20.7 11.7 28.3 2.6-5.2 6-9.9 10.2-14.1 5-5 10.9-9 17.3-11.7zM49.8 38.5C45 29.7 39.5 21.4 33.2 13.7c-4.2 2-8.1 4.7-11.5 8-6.1 6.1-9.9 13.7-11.2 22 2.5.2 5.1.3 7.6.3 11.1 0 21.8-1.9 31.7-5.5z" fill="#ffffff" opacity="1" data-original="#000000" class=""></path></g></svg>
                                                      </td>
                                                    </tr>
                                                  </table>
                                                </span>
                                              </a>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                    
                                    <tr>
                                      <!-- ID:BR FOOTER BORDER -->
                                      <td height="20" style="border-bottom:1px solid #cccccc; line-height: 20px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="20" style="line-height: 20px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:TXT FOOTER ADDRESS -->
                                      <td align="center" class="MsoNormal" style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:400; line-height:24px; letter-spacing:1px;">
                                        <multiline>Plot-40, First Floor, Beside Tapi Darshan Gate-1 Causeway Circle, Singanpor Rd, Katargam, Surat, Gujarat 395004</multiline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="10" style="line-height:10px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:TXT FOOTER MAIL -->
                                      <td align="center" class="MsoNormal" style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:400; line-height:24px; letter-spacing:1px;">
                                         <multiline><a href="#" style="color:#fff;text-decoration:none;">info@scalelot.com</a></multiline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="10" style="line-height:10px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:TXT FOOTER PHONE -->
                                      <td align="center" class="MsoNormal" style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:14px; font-weight:400; line-height:24px; letter-spacing:1px;">
                                        <multiline> +91 87803 33608 </multiline>
                                      </td>
                                    </tr>
                                    <tr>
                                      <!-- ID:BR FOOTER BORDER -->
                                      <td height="20" style="border-bottom:1px solid #cccccc; line-height: 20px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <td height="20" style="line-height: 20px; mso-line-height-rule: exactly; font-size:0;">
                                        &nbsp;
                                      </td>
                                    </tr>
                                    <tr>
                                      <td align="center" class="MsoNormal" style="color:#fff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; font-size:12px; font-weight:400; line-height:22px; letter-spacing:1px;">
                                        <multiline> <span class="" style="font-weight: 600;font-size: 14px;">Copyright © 2019 Scalelot Technologies. All Rights Reserved </span></multiline>
                                      </td>
                                    </tr>
                                  </table>
                                </div>
                                <!--[if mso]>
                                        </td>
                                      </tr>
                                    </table>
                                  <![endif]-->
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
            </layout>
          </repeater>
          <!-- FOOTER ENDS -->
          <!-- FOOTER BOTTOM SPACE BEGINING -->
          <table align="center" bgcolor="#333333" border="0" cellpadding="0" cellspacing="0" width="100%">
            <tbody>
              <tr>
                <td align="center" style="font-size:0;">
                  <!--[if mso]>
                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="800" style="width: 800px;">
                    <tr>
                      <td align="center" valign="top" width="100%" style="max-width:800px;">
                        <![endif]-->
                  <div style="display:inline-block; width:100%; max-width:800px; vertical-align:top;" class="width800">
                    <!-- ID:BG FOOTER -->
                    <table align="center" bgcolor="#000" border="0" cellpadding="0" cellspacing="0" class="display-width" width="100%" style="max-width:800px;">
                      <tbody>
                        <tr>
                          <td align="center" class="padding">
                            <!--[if mso]>
                                  <table aria-hidden="true" border="0" cellspacing="0" cellpadding="0" align="center" width="600" style="width:600px;">
                                    <tr>
                                      <td align="center">
                                        <![endif]-->
                            <div style="display:inline-block; width:100%; max-width:600px; vertical-align:top;" class="main-width">
                              <table align="center" border="0" class="display-width-inner" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                                <tr>
                                  <td height="60" style="mso-line-height-rule:exactly; line-height:60px; font-size:0;">
                                    &nbsp;
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!--[if mso]>
                                      </td>
                                    </tr>
                                  </table>
                                  <![endif]-->
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!--[if mso]>
                      </td>
                    </tr>
                  </table>
                  <![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- FOOTER BOTTOM SPACE ENDING -->
          <unsubscribe style="display:none;">Unsubscribe Here</unsubscribe>
        </body>
      </html>`;
      sendSmtpEmail.sender = { "name": "Scalelot Technologies", "email": process.env.SIB_EMAIL_ID };
      sendSmtpEmail.to = [
        { "email": email, "name": "New Subscriber" }
      ];
      sendSmtpEmail.replyTo = { "email": process.env.SIB_EMAIL_ID, "name": "Scalelot Technologies" };
      sendSmtpEmail.params = { "subject": 'Welcome, This is confirmation mail for your subscription - Scalelot Technologies' };
      apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
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
