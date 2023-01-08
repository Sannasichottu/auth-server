const nodemailer = require('nodemailer');
const {google} = require ('googleapis');
const {OAuth2} = google.auth
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

require('dotenv').config();

const  {
    G_CLIENT_ID,
    G_CLIENT_SECRET,
    G_REFRESH_TOKEN,
    ADMIN_EMAIL
} = process.env


const oauth2client = new OAuth2 (
    G_CLIENT_ID,
    G_CLIENT_SECRET,
    G_REFRESH_TOKEN,
    OAUTH_PLAYGROUND
)

const sendEmailRegister = (to, url, text) => {
    oauth2client.setCredentials({
        refresh_token:G_REFRESH_TOKEN
    })
    const accessToken = oauth2client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service:'gmail',
        auth : {
            type:"OAuth2",
            user :ADMIN_EMAIL,
            clientId:G_CLIENT_ID,
            clientSecret:G_CLIENT_SECRET,
            refreshToken:G_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from : ADMIN_EMAIL,
        to : to,
        subject:"ACTIVATE YOUR ACCOUNT",
        html : `<html lang="en>
            <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width= device-width, initial-scale=1.0" />
             <title>Chottu | Account Activate</title>
            <style>
            .body {
                background-color : #333333;
                height : 100vh;
                font-family: "Roboto", sans-serif;
                color : #fff;
                position : relative;
                text-align : center;
            }
            .container {
            max-width: 700px;
            width : 100%;
            height:100%;
            margin : 0 auto;
            }
            .wrapper{
                padding: 0 15px;
                position:absolute;
                top:50%;
                left:50%;
                transform : translate(-50%, -50%);
                width:100%
            }
            span {
                color :#ffc107;
            }
            button {
                background-color: #fbc02d;
                border-radius: 5px;
                border:0;
                padding: 1em 6em;
                text-align: center;
                transition: all 0.3s ease-in;
                cursor: pointer;
            }
            button:hover {
                background-color:hsl(45,70%,51%);
                transition:all 0.3s ease-in;
            }
            .spacing {
                margin-top:5rem;
            }
            </style>
            </head>
            <body>
                <div class="container">
                    <div class="wrapper">
                        <div class="card">
                            <h1><span>Welcome !</span> And thank you for registering !</h1>
                            <p>Please validate your email by clicking the button below 😊 </p>
                            <a href=${url}><button>${text}</button></a>
                            <p class="spacing">
                                If the button above does not work, please navigate to the link
                                provided below 👇
                            </P>
                            <div>${url}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>`
    }


smtpTransport.sendMail(mailOptions, (err, info) => {
    if(err) return {err};
    return info;
});
};

const sendEmailReset = (to, url, text ,name) => {
    oauth2client.setCredentials({
        refresh_token:G_REFRESH_TOKEN
    })
    const accessToken = oauth2client.getAccessToken()
    const smtpTransport = nodemailer.createTransport({
        service:'gmail',
        auth : {
            type:"OAuth2",
            user :ADMIN_EMAIL,
            clientId:G_CLIENT_ID,
            clientSecret:G_CLIENT_SECRET,
            refreshToken:G_REFRESH_TOKEN,
            accessToken
        }
    })

    const mailOptions = {
        from : ADMIN_EMAIL,
        to : to,
        subject:"RESET PASSWORD",
        html : `<html lang="en>
            <head>
            <meta charset="UTF-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width= device-width, initial-scale=1.0" />
             <title>Chottu | Account Activate</title>
             <style>
             .container {
             width: 100%;
             margin: 0 auto;
             padding: 0 15px;
             }
             .wrapper{
                 display: flex;
                 justify-content: space-between;
                 align-items: center;
                 width: 100%;
                 padding: 0 15px;
             }

             .span {
                 color :#fbc02d;
             }
             button {
                 background-color: #fbc02d;
                 border-radius: 3px;
                 color: black;
                 padding: 15px 32px;
                 text-align: center;
                 text-decoration: none;
                 font-size: 16px;
                 margin: 4px 2px;
                 cursor: pointer;
             }
             .spacing {
                 margin-top:5rem;
             }
             </style>
            </head>
            <body>
                <div class="container">
                    <div class="wrapper">
                        <div class="card">
                            <h1><span>Hey</span> ${name}</h1>
                            <p>Please click the button to reset your password 😊 </p>
                            <a href=${url}><button>${text}</button></a>
                            <p class="spacing">
                                If the button above does not work, please navigate to the link
                                provided below 👇
                            </P>
                            <div>${url}</div>
                        </div>
                    </div>
                </div>
            </body>
        </html>`
    }


smtpTransport.sendMail(mailOptions, (err, info) => {
    if(err) return {err};
    return info;
});
};

module.exports = {sendEmailRegister, sendEmailReset};
