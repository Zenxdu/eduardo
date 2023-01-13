"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HtmlDocumentContentManager = void 0;
const htmlPreview_1 = require("../util/htmlPreview");
class HtmlDocumentContentManager {
    constructor(editor) {
        this._editor = editor;
        return this;
    }
    // @Override
    editor() {
        return this._editor;
    }
    // 生成当前编辑页面的HTM L代码片段
    // @Override
    async createContentSnippet() {
        let editor = this._editor;
        if (!editor || !editor.document) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        let previewSnippet = this.generatePreviewSnippet(editor);
        if (!previewSnippet || previewSnippet.length <= 0) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getErrorMessage());
        }
        console.info("previewSnippet = " + previewSnippet);
        return previewSnippet;
    }
    // @Override
    sendPreviewCommand(previewUri, displayColumn, _editor) {
        return htmlPreview_1.HtmlPreview.sendPreviewCommand(previewUri, displayColumn);
    }
    getErrorMessage() {
        return `Active editor doesn't show a HTML document - no properties to preview.`;
    }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    // 生成预览编辑页面
    // @Override
    generatePreviewSnippet(editor) {
        if (!editor || !editor.document) {
            return htmlPreview_1.HtmlPreview.errorSnippet("No Active editor - no properties to preview.");
        }
        // 获取当前编辑页面对应的文档
        let doc = editor.document;
        return htmlPreview_1.HtmlPreview.createLocalSource(htmlPreview_1.SourceType.STYLE, "header_fix.css") +
            htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.BR) +
            htmlPreview_1.HtmlPreview.fixNoneNetLinks(doc.getText(), doc.fileName);
    }
}
exports.HtmlDocumentContentManager = HtmlDocumentContentManager;

//# sourceMappingURL=htmlDocumentContentManager.js.map
