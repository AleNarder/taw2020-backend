import * as nodemailer from 'nodemailer'

import resetPassword from './controllers/reset-password'
import confirmUser from './controllers/confirm-user'
import newModerator from './controllers/new-moderator'
import { resolve } from 'dns'

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

  sendEmail (type: 'reset-password' | 'confirm-user' | 'new-moderator',  to: string, link: string, moderator?: string): Promise<string> {
    return new Promise((resolve, reject) => {
      let subject, html, btnText = null
      switch (type) {
        case 'new-moderator':
          subject = 'Sei stato invitato come moderatore'
          btnText = 'Accedi'
          html = newModerator(link, moderator, btnText)
        case 'confirm-user':
          subject = 'Benvenuto in taw 2020'
          btnText = 'Accedi'
          html = confirmUser(link, btnText)
          break;
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