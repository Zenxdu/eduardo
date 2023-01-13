"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CssDocumentContentManager = void 0;
const htmlPreview_1 = require("../util/htmlPreview");
class CssDocumentContentManager {
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
        if (!editor) {
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
        return `Active editor doesn't show a CSS document - no properties to preview.`;
    }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    CSSSampleFullSnippet(properties) {
        return htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.CUSTOM_STYLE_SAMPLE, properties);
    }
    getSelectedCSSProperity(editor) {
        if (!editor || !editor.document) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        // 获取当前页面文本
        let text = editor.document.getText();
        // 获取当前鼠标选中段落的起始位置        
        let startPosOfSelectionText = editor.document.offsetAt(editor.selection.anchor);
        let startPosOfCSSProperty = text.lastIndexOf('{', startPosOfSelectionText);
        let endPosOfCSSProperty = text.indexOf('}', startPosOfCSSProperty);
        if (startPosOfCSSProperty === -1 || endPosOfCSSProperty === -1) {
            return htmlPreview_1.HtmlPreview.errorSnippet("Cannot determine the rule's properties.");
        }
        var properties = text.slice(startPosOfCSSProperty + 1, endPosOfCSSProperty);
        return properties;
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
        return this.CSSSampleFullSnippet(cssProperty);
    }
}
exports.CssDocumentContentManager = CssDocumentContentManager;

//# sourceMappingURL=cssDocumentContentManager.js.map
