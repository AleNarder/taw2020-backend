"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../models/template");
function confirm(link, btnText) {
    const title = "Benvenuto in taw 2020";
    const text = "Per accedere alla tua area riservata, premi il pulsante sottostante";
    return template_1.default(title, text, link, btnText);
}
exports.default = confirm;
//# sourceMappingURL=confirm-user.js.map