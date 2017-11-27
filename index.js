const fs = require("fs");
const path = require("path");
const login = require("facebook-chat-api");
const fbConfig = require(path.join(__dirname, "./config/facebook.json"));

let phrases = require(path.join(__dirname, "./config/phrases.json")).phrases;

// Create _sent.json if it doesn't exist
if (!fs.existsSync(path.join(__dirname, "./config/_sent.json"))) {
  fs.writeFileSync(path.join(__dirname, "./config/_sent.json"), '{"sent": []}');
}

let sent = require(path.join(__dirname, "./config/_sent.json")).sent;
login({email: fbConfig.email, password: fbConfig.password}, (err, api) => {
  if (err) return console.error(err);

  messageToSend = phrases[0];
  console.log("Sending: " + messageToSend);
 
  fbConfig.recipients.forEach((id) => {
    api.sendMessage(messageToSend, id);
  });

  // Update the data lists before closing this session.
  sent.push(messageToSend);
  i = phrases.indexOf(messageToSend);
  phrases.splice(i, 1);

  fs.writeFileSync(path.join(__dirname, "./config/phrases.json"), JSON.stringify({phrases: phrases}));
  fs.writeFileSync(path.join(__dirname, "./config/_sent.json"), JSON.stringify({sent: sent}));
});
