"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../models/template");
function newModerator(link, btnText) {
    const title = "Sei stato invitato a registarti come moderatore";
    const text = "Per completare la registrazione, clicca il pulsante sottostante";
    return template_1.default(title, text, link, btnText);
}
exports.default = newModerator;
//# sourceMappingURL=new-moderator.js.map