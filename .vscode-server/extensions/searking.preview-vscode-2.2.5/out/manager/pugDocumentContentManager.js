"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PugDocumentContentManager = void 0;
const pug = require("pug");
const htmlPreview_1 = require("../util/htmlPreview");
class PugDocumentContentManager {
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
        return this.generatePreviewSnippet(editor);
    }
    // @Override
    sendPreviewCommand(previewUri, displayColumn) {
        return htmlPreview_1.HtmlPreview.sendPreviewCommand(previewUri, displayColumn);
    }
    // private getErrorMessage(): string {
    //     return `Active editor doesn't show a Pug Text document (.pug)- no properties to preview.`;
    // }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    pugSrcSnippetWithNodeModules(pugContent) {
        // compile
        var options = {
            pretty: true
        };
        var fn = pug.compile(pugContent, options);
        var html = fn();
        return html;
    }
    pugSrcSnippet(editor) {
        if (!editor) {
            return Promise.resolve(htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage()));
        }
        return Promise.resolve(this.pugSrcSnippetWithNodeModules(editor.document.getText()));
    }
    // 生成预览编辑页面
    generatePreviewSnippet(editor) {
        if (!editor || !editor.document) {
            return Promise.resolve(htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage()));
        }
        // 获取当前编辑页面对应的文档
        let doc = editor.document;
        return this.pugSrcSnippet(editor).then(function (pugSrc) {
            return htmlPreview_1.HtmlPreview.fixNoneNetLinks(pugSrc, doc.fileName);
        });
    }
}
exports.PugDocumentContentManager = PugDocumentContentManager;

//# sourceMappingURL=pugDocumentContentManager.js.map
