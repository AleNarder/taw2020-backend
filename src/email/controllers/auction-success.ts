import template from '../models/template'

export default function confirm (link, btnText: string, seller: boolean) {
  const title = (seller) 
    ? "La tua asta è terminata!" 
    : "Hai vinto l'asta"
  const text = `${seller ? 'L\'ultima' : 'La tua' } offerta ha raggiunto il prezzo di riserva, clicca il pulsante sottostante per visualizzare l'asta`
  return template(title, text, link, btnText)
}
