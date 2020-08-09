import template from '../models/template'

export default function (link, btnText: string) {
  const title = "L'asta non ha raggiunto il prezzo di riserva"
  const text = "Per visualizzare l'asta, clicca il pulsante sottostante"
  return template(title, text, link, btnText)
}
