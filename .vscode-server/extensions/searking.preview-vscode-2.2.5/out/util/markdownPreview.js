"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownPreview = void 0;
const vscode_1 = require("vscode");
const textEditorHelper_1 = require("./textEditorHelper");
class MarkdownPreview {
    // @Override
    static sendPreviewCommand(_previewUri, displayColumn) {
        let command = MarkdownPreview.getPreviewCommandTag(displayColumn);
        if (command != this.COMMAND_BUTT) {
            return vscode_1.commands.executeCommand(command).then(() => { }, (reason) => {
                console.warn(reason);
                vscode_1.window.showErrorMessage(reason);
            });
        }
        return Promise.resolve();
    }
    static getPreviewCommandTag(displayColumn) {
        if (!vscode_1.window.activeTextEditor) {
            return "";
        }
        if (displayColumn == vscode_1.window.activeTextEditor.viewColumn) {
            return MarkdownPreview.getCommandTogglePreview();
        }
        return MarkdownPreview.getCommandOpenPreviewSideBySide();
    }
    static getCommandTogglePreview() {
        if (textEditorHelper_1.TextEditorHelper.versionCompare(vscode_1.version, "1.3.0") < 0) {
            return MarkdownPreview.COMMAND_TOGGLE_PREVIEW;
        }
        return MarkdownPreview.COMMAND_TOGGLE_PREVIEW_1_3_0;
    }
    static getCommandOpenPreviewSideBySide() {
        if (textEditorHelper_1.TextEditorHelper.versionCompare(vscode_1.version, "1.3.0") < 0) {
            return MarkdownPreview.COMMAND_OPEN_PREVIEW_SIDE_BY_SIDE;
        }
        return MarkdownPreview.COMMAND_OPEN_PREVIEW_SIDE_BY_SIDE_1_3_0;
    }
}
exports.MarkdownPreview = MarkdownPreview;
MarkdownPreview.COMMAND_TOGGLE_PREVIEW = "workbench.action.markdown.togglePreview";
MarkdownPreview.COMMAND_OPEN_PREVIEW_SIDE_BY_SIDE = "workbench.action.markdown.openPreviewSideBySide";
MarkdownPreview.COMMAND_TOGGLE_PREVIEW_1_3_0 = "markdown.showPreview";
MarkdownPreview.COMMAND_OPEN_PREVIEW_SIDE_BY_SIDE_1_3_0 = "markdown.showPreviewToSide";
MarkdownPreview.COMMAND_BUTT = "";

//# sourceMappingURL=markdownPreview.js.map
