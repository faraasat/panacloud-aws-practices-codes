const aws = require("aws-sdk");

exports.handler = (event: any, context: any, callback: any) => {
  console.log(event);

  // After Sign Up should I auto confirm the user
  event.response.autoConfirmUser = true;

  // Below two if means do not send a code to verify

  /// If email exists marked it as verified
  if (event.request.userAttributes.hasOwnProperty("email")) {
    event.response.autoVerifyEmail = true;
  }

  ///If phone exists marked it as verified
  if (event.request.userAttributes.hasOwnProperty("phone_number")) {
    event.response.autoVerifyPhone = true;
  }

  // Return to Amazon Cognito
  callback(null, event);
};
