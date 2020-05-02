"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Interruptable {
    constructor() {
        process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
            console.log('app termination');
            const closed = yield this.sigint();
            if (!closed)
                console.error('Bad SIGUSR2');
            process.exit(0);
        }));
        process.on('SIGUSR2', () => __awaiter(this, void 0, void 0, function* () {
            console.log('nodemon restart');
            const closed = yield this.sigusr2();
            if (!closed)
                console.error('Bad SIGUSR2');
            process.kill(process.pid);
        }));
        process.once('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
            console.log('Heroku app shutdown');
            const closed = yield this.sigterm();
            if (!closed)
                console.error('Bad SIGTERM');
            process.exit(0);
        }));
    }
}
exports.default = Interruptable;
