import * as nodemailer from 'nodemailer'

import resetPassword from './controllers/reset-password'
import confirmUser from './controllers/confirm-user'
import newModerator from './controllers/new-moderator'
import auctionSuccess from './controllers/auction-success'
import auctionFail from './controllers/auction-fail'
import auctionNewOffer from './controllers/auction-new-offer'

type emailType = 
  'reset-password'
  | 'confirm-user'  
  | 'new-moderator' 
  | 'auction-success-buyer' 
  | 'auction-success-seller'
  | 'auction-fail'
  | 'auction-new-offer'

class EmailSender {
  
  private transporter: nodemailer.Transporter 
  private from: string
  private pass: string


  constructor () {

    this.from = process.env.EMAIL_US,
    this.pass = process.env.EMAIL_PW

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.from,
        pass: this.pass
      }
    })
  }

  sendEmail (type: emailType,  to: string, link: string, moderator?: string, auctionName ?: string ): Promise<string> {
    return new Promise((resolve, reject) => {
      let subject, html, btnText = null
      console.log(type)
      switch (type) {
        case 'new-moderator':
          subject = 'Sei stato invitato come moderatore'
          btnText = 'Accedi'
          html = newModerator(link, btnText)
        case 'confirm-user':
          subject = 'Benvenuto in taw 2020'
          btnText = 'Accedi'
          html = confirmUser(link, btnText)
          break;
        case 'auction-success-seller':
          subject =  `Asta ${auctionName.toUpperCase()} conclusa`
          btnText = 'Visualizza asta'
          html = auctionSuccess(link, btnText, true)
          break;
        case 'auction-success-buyer': 
          subject = `Hai vinto l\'asta ${auctionName.toUpperCase()}!`
          btnText = 'Visualizza asta'
          html = auctionSuccess(link, btnText, false)
          break;
        case 'auction-fail':
          subject =  `Asta ${auctionName.toUpperCase()} invenduta`
          btnText = 'Visualizza asta'
          html = auctionFail(link, btnText)
          break;
        case 'auction-new-offer':
          subject = `Nuova offerta in ${auctionName.toUpperCase()}`
          btnText = 'Rilancia'
          html = auctionNewOffer(link, btnText)
        default:
          subject = 'Reset password'
          btnText = 'Reimposta'
          html = resetPassword(link, btnText)
          break;
      }
      
      const options = {
        from: this.from,
        to,
        subject,
        html
      }
  
      this.transporter.sendMail(options, function (err, info) {
        if (err) {
          reject()
        } else {
          resolve()
        }
      })
    })
  }
}

export default new EmailSender()