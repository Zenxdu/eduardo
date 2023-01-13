"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MermaidDocumentContentManager = void 0;
const htmlPreview_1 = require("../util/htmlPreview");
class MermaidDocumentContentManager {
    constructor(editor) {
        this._editor = editor;
        return this;
    }
    // @Override
    editor() {
        return this._editor;
    }
    // 生成当前编辑页面的可预览代码片段
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
    sendPreviewCommand(previewUri, displayColumn) {
        return htmlPreview_1.HtmlPreview.sendPreviewCommand(previewUri, displayColumn);
    }
    getErrorMessage() {
        return `Active editor doesn't show a Mermaid document - no properties to preview.`;
    }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    MermaidSampleFullSnippet(properties) {
        return htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.CUSTOM_MERMAID_SAMPLE, properties);
    }
    getSelectedCSSProperity(editor) {
        if (!editor || !editor.document) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        return editor.document.getText();
    }
    // 生成预览编辑页面
    generatePreviewSnippet(editor) {
        if (!editor) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        var cssProperty = this.getSelectedCSSProperity(editor);
        if (!cssProperty || cssProperty.length <= 0) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getErrorMessage());
        }
        return this.MermaidSampleFullSnippet(cssProperty);
    }
}
exports.MermaidDocumentContentManager = MermaidDocumentContentManager;

//# sourceMappingURL=mermaidDocumentContentManager.js.map
