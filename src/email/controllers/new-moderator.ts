import template from '../models/template'

export default function newModerator (link: string, moderator: string, btnText: string) {
  const title = `Sei stato invitato come moderatore da ${moderator}`
  const text = "Per registarti come moderatore, clicca il pulsante sottostante"
  return template(title, text, link, btnText)
}
