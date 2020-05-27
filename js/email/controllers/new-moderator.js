"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../models/template");
function newModerator(link, moderator, btnText) {
    const title = `Sei stato invitato come moderatore da ${moderator}`;
    const text = "Per registarti come moderatore, clicca il pulsante sottostante";
    return template_1.default(title, text, link, btnText);
}
exports.default = newModerator;
//# sourceMappingURL=new-moderator.js.map