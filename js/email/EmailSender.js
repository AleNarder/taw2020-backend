"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const reset_password_1 = require("./controllers/reset-password");
const confirm_user_1 = require("./controllers/confirm-user");
const new_moderator_1 = require("./controllers/new-moderator");
const auction_success_1 = require("./controllers/auction-success");
const auction_fail_1 = require("./controllers/auction-fail");
const auction_new_offer_1 = require("./controllers/auction-new-offer");
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
    sendEmail(type, to, link, moderator, auctionName) {
        return new Promise((resolve, reject) => {
            let subject, html, btnText = null;
            console.log(type);
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
                case 'auction-success-seller':
                    subject = `Asta ${auctionName.toUpperCase()} conclusa`;
                    btnText = 'Visualizza asta';
                    html = auction_success_1.default(link, btnText, true);
                    break;
                case 'auction-success-buyer':
                    subject = `Hai vinto l\'asta ${auctionName.toUpperCase()}!`;
                    btnText = 'Visualizza asta';
                    html = auction_success_1.default(link, btnText, false);
                    break;
                case 'auction-fail':
                    subject = `Asta ${auctionName.toUpperCase()} invenduta`;
                    btnText = 'Visualizza asta';
                    html = auction_fail_1.default(link, btnText);
                    break;
                case 'auction-new-offer':
                    subject = `Nuova offerta in ${auctionName.toUpperCase()}`;
                    btnText = 'Rilancia';
                    html = auction_new_offer_1.default(link, btnText);
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