import * as Twilio from "twilio";
const accountSid = "ACbd0ea4caef5168c3e85f5b548e9125f7"; // Your Account SID from www.twilio.com/console
const authToken = "fb4d725d2819718d4c73a675b20bceb9"; // Your Auth Token from www.twilio.com/consol
const client = new Twilio(accountSid, authToken);

client.messages
  .create({
    body: "Hello from Node",
    to: "+12345678901", // Text this number
    from: "+522491374830", // From a valid Twilio number
  })
  .then((message) => console.log(message.sid));
