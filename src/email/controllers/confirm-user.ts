import template from '../models/template'

export default function confirm (link, btnText: string) {
  const title = "Benvenuto in taw 2020"
  const text = "Per accedere alla tua area riservata, premi il pulsante sottostante"
  return template(title, text, link, btnText)
}
