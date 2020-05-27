"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../models/template");
function resetPassword(link, btnText) {
    const title = "Reimposta password";
    const text = "Per reimpostare la password, clicca il pulsante sottostante";
    return template_1.default(title, text, link, btnText);
}
exports.default = resetPassword;
//# sourceMappingURL=reset-password.js.map