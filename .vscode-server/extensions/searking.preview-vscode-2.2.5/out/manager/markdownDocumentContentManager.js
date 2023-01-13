"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownDocumentContentManager = void 0;
const htmlPreview_1 = require("../util/htmlPreview");
// import { MarkdownPreview } from "../util/markdownPreview";
let Markdown2HtmlLess = require("markdown2html-less").Markdown2HtmlLess;
const markdown2htmlLess = new Markdown2HtmlLess();
class MarkdownDocumentContentManager {
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
        if (this._editor.document.languageId !== "markdown") {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getErrorMessage());
        }
        let previewSnippet = await this.generatePreviewSnippet(editor);
        if (!previewSnippet || previewSnippet.length <= 0) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getErrorMessage());
        }
        console.info("previewSnippet = " + previewSnippet);
        return previewSnippet;
    }
    // @Override
    sendPreviewCommand(previewUri, displayColumn) {
        // return MarkdownPreview.sendPreviewCommand(previewUri, displayColumn);
        return htmlPreview_1.HtmlPreview.sendPreviewCommand(previewUri, displayColumn);
    }
    getErrorMessage() {
        return `Active editor doesn't show a MarkDown document - no properties to preview.`;
    }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    // 生成预览编辑页面
    generatePreviewSnippet(editor) {
        return (async () => {
            if (!editor || !editor.document) {
                return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
            }
            // 获取当前编辑页面对应的文档
            let doc = editor.document;
            // let html = editormd.markdownToHTML(doc.getText());
            let html = await this.getHTML(doc.getText());
            return htmlPreview_1.HtmlPreview.fixNoneNetLinks(html, doc.fileName);
        })();
    }
    getHTML(md) {
        const html = markdown2htmlLess.markdown2html(md);
        html.head = html.head || '';
        html.body = html.body || '';
        return Promise.resolve(htmlPreview_1.HtmlPreview.createFullHtmlSnippetFrom(`${html.head}`, `${html.body}`));
    }
}
exports.MarkdownDocumentContentManager = MarkdownDocumentContentManager;

//# sourceMappingURL=markdownDocumentContentManager.js.map
