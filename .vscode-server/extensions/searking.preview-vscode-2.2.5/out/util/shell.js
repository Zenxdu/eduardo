"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shell = void 0;
const child_process_1 = require("child_process");
class Shell {
    static execPromisLike(cmd) {
        return new Promise((resolve, reject) => {
            child_process_1.exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    let errorMessage = [
                        error.name,
                        error.message,
                        error.stack,
                        "",
                        stderr.toString()
                    ].join("\n");
                    reject(errorMessage);
                    return;
                }
                resolve(stdout.toString());
                return;
            });
        });
    }
}
exports.Shell = Shell;

//# sourceMappingURL=shell.js.map
