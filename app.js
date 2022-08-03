const express = require("express");
const app = express();

const https = require("https");

app.use(express.static("public"));
app.use(express.urlencoded());

app.get("/",function(req,res)
{
    res.sendFile(__dirname + "/signup.html"); 

})

app.post("/",function (req,res) 
{  
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const e_mail = req.body.email;

    const data = 
    {
        members : 
        [
            {
                email_address: e_mail,
                status : "subscribed",
                merge_fields : 
                {
                    FNAME : firstName,
                    LNAME : lastName,
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    const url = "https://us{YOUR MAILCHIMP SERVER ex:14}.api.mailchimp.com/3.0/lists/Your Audience(List) ID(MailChimp)"

    const options = 
    {
        method : "POST",
        auth : "EXAMPLE_USERNAME:YOUR MAILCHIMP API KEY"
    }

    const request = https.request(url,options,function(response)
    {
        if(response.statusCode === 200)
        {
            res.sendFile(__dirname + "/success.html");
        }
        else
        {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        });
    })

    request.write(jsonData);
    request.end();

})

app.post("/failure",function (req,res) 
{  
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function () //process.env.PORT is for hekoru port.
{  
    console.log("Server is running on port 3000.");
})

