import template from '../models/template'

export default function newModerator (link: string, btnText: string) {
  const title = "Sei stato invitato a registarti come moderatore"
  const text = "Per completare la registrazione, clicca il pulsante sottostante"
  return template(title, text, link, btnText)
}
