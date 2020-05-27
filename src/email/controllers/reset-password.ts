import template from '../models/template'


export default function resetPassword (link, btnText) {
    const title = "Reimposta password"
    const text = "Per reimpostare la password, clicca il pulsante sottostante"
    return template(title, text, link, btnText)
}


