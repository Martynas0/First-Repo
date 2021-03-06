const express = require("express");
const app = express();
const path = require("path");
const mailchimp = require("@mailchimp/mailchimp_marketing");
var port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
  extended: true
}))

mailchimp.setConfig({
  apiKey: "a6070f2ab82cf347f1988286e902ec9f-us1",
  server: "us1"
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
})
app.post("/failure", function(req, res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/signup", function(req, res) {
      async function run() {
        const response = await mailchimp.lists.addListMember("4abef2947c", {
          email_address: req.body.email,
          status: "subscribed",
          merge_fields: {
            FNAME: req.body.fname,
            LNAME: req.body.lname
          }
        });
          res.sendFile(__dirname + "/success.html")
      }

      run().catch(e => res.sendFile(__dirname + "/failure.html"));

    })



       app.listen(port, function() {
      console.log("Server is Live !");
    })
