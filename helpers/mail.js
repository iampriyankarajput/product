'use strict';
const Config = require('../config/config');
const sgridMail = require('sendgrid')(Config.Sendgrid.apiKey);

const sendEmail =  (to, options, template) => {
    var nodemailer = require('nodemailer');
    var hbs = require('nodemailer-express-handlebars');
    var optionsData = {
        viewEngine: {
            extname: '.html',
            layoutsDir: 'backend/lib/templates/',
            defaultLayout : template,
            partialsDir : 'backend/lib/templates/'
        },
        viewPath: 'backend/lib/templates/',
        extName: '.html'
    };
    var sgTransport = require('nodemailer-sendgrid-transport');
    //using sendgrid as transport, but can use any transport.
    var send_grid = {
        auth: {
            api_user: Config.Sendgrid.username,
            api_key: Config.Sendgrid.password
        }
    }
    var mailer = nodemailer.createTransport(sgTransport(send_grid));
    mailer.use('compile', hbs(optionsData));
    mailer.sendMail({
        from: Config.Sendgrid.from,
        to: to.email,
        subject: options.subject,
        template: template,
        context: {
            fullName: to.fullName,
            to: to,
            options: options,
            emailFooter: Config.emailFooter
        }
    }, function (error, response) {
        if(error) {
            console.log("Error in sent email to "+ to.email, error);
        } else {
            console.log("Mail sent!! to "+ to.email);
        }
        mailer.close();
    });
}

exports.sendEmailBySendgrid = (to, options, template) => {
    return sendEmail(to, options, template);
};
