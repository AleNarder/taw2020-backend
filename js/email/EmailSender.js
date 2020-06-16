"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const reset_password_1 = require("./controllers/reset-password");
const confirm_user_1 = require("./controllers/confirm-user");
const new_moderator_1 = require("./controllers/new-moderator");
class EmailSender {
    constructor() {
        this.from = process.env.EMAIL_US,
            this.pass = process.env.EMAIL_PW;
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: this.from,
                pass: this.pass
            }
        });
    }
    sendEmail(type, to, link, moderator) {
        return new Promise((resolve, reject) => {
            let subject, html, btnText = null;
            switch (type) {
                case 'new-moderator':
                    subject = 'Sei stato invitato come moderatore';
                    btnText = 'Accedi';
                    html = new_moderator_1.default(link, btnText);
                case 'confirm-user':
                    subject = 'Benvenuto in taw 2020';
                    btnText = 'Accedi';
                    html = confirm_user_1.default(link, btnText);
                    break;
                default:
                    subject = 'Reset password';
                    btnText = 'Reimposta';
                    html = reset_password_1.default(link, btnText);
                    break;
            }
            const options = {
                from: this.from,
                to,
                subject,
                html
            };
            this.transporter.sendMail(options, function (err, info) {
                if (err) {
                    reject();
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.default = new EmailSender();
//# sourceMappingURL=EmailSender.js.map