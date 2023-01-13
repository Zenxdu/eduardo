"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MermaidPreview = void 0;
const vscode_1 = require("vscode");
class MermaidPreview {
    // @Override
    static sendPreviewCommand(command) {
        if (command != this.COMMAND_BUTT) {
            return vscode_1.commands.executeCommand(command).then(() => {
            }, (reason) => {
                console.warn(reason);
                vscode_1.window.showErrorMessage(reason);
            });
        }
        return Promise.resolve();
    }
    static isMermaidFile(editor) {
        if (!editor || !editor.document || !editor.document.fileName) {
            return false;
        }
        if (editor.document.fileName.toLowerCase().endsWith(".mermaid")) {
            return true;
        }
        return false;
    }
}
exports.MermaidPreview = MermaidPreview;
MermaidPreview.COMMAND_BUTT = "";

//# sourceMappingURL=mermaidPreview.js.map
