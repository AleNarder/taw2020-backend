var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * Nodemon restarted
 */
process.once('SIGUSR2', () => {
    DbUtils.close('nodemon restart', () => {
        process.kill(process.pid, 'SIGUSR2');
    });
});
/**
 * Heroku closes the app
 */
process.on('SIGTERM', () => __awaiter(this, void 0, void 0, function* () {
    DbUtils.close('Heroku shutdown', () => {
        process.exit(0);
    });
}));
/**
 * App has been terminated by SIGINT
 */
process.on('SIGINT', () => __awaiter(this, void 0, void 0, function* () {
    DbUtils.close('app termination', () => {
        process.exit(0);
    });
}));
