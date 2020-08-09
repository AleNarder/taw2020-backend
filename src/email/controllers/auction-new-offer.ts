import template from '../models/template'

export default function confirm (link, btnText: string) {
  const title = "Qualcuno ha fatto una nuova offerta sull'asta che stai seguendo"
  const text = "Per visualizzare l'asta, premi il pulsante sottostante"
  return template(title, text, link, btnText)
}
