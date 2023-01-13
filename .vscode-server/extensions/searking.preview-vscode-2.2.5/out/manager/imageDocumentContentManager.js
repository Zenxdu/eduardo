"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageDocumentContentManager = void 0;
const htmlPreview_1 = require("../util/htmlPreview");
const textEditorHelper_1 = require("../util/textEditorHelper");
class ImageDocumentContentManager {
    constructor(editor) {
        this.IMAGE_TYPE_REGREX_PREFFIX = /http[s]{0,1}:\/\/|file:\/\/|\s[.]{0,2}\//;
        this.IMAGE_TYPE_REGREX_SUFFIX = /png|jpg|jpeg|gif|bmp|\s/;
        this.IMAGE_TYPE_REGREX_SPLIT = /\s/;
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
        const editor = this._editor;
        if (!editor) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        const previewSnippet = await this.generatePreviewSnippet(editor);
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
        return `Active editor doesn't show any  ${this.IMAGE_TYPE_REGREX_SUFFIX} - no properties to preview.`;
    }
    getWindowErrorMessage() {
        return `No Active editor - no properties to preview.`;
    }
    imageSrcSnippet(imageUri) {
        return htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.IMAGE, imageUri);
    }
    // 获取指定位置开始后的第一个分隔符的位置
    indexOfSplit(editor, startPos) {
        return textEditorHelper_1.TextEditorHelper.regexIndexOf(editor, startPos, this.IMAGE_TYPE_REGREX_SPLIT);
    }
    // 获取指定位置开始前的第一个资源前缀的位置
    lastIndexOfPrefix(editor, startPos) {
        return textEditorHelper_1.TextEditorHelper.regexLastIndexOf(editor, startPos, this.IMAGE_TYPE_REGREX_PREFFIX);
    }
    // 获取指定位置开始前的第一个资源前缀的位置
    lastIndexOfSuffix(editor, startPos) {
        return textEditorHelper_1.TextEditorHelper.regexLastIndexOf(editor, startPos, this.IMAGE_TYPE_REGREX_SUFFIX);
    }
    // 获取指定位置开始后的第一个分隔符前的最后一个后缀的位置
    getEndOfImageUrl(editor, startPosOfImageUrl, startPosOfSplit) {
        if (!editor) {
            return -1;
        }
        const startIndexOfSuffix = this.lastIndexOfSuffix(editor, startPosOfSplit);
        const startPosOfSuffix = startIndexOfSuffix.pos;
        const selectedSuffix = startIndexOfSuffix.mark;
        if (startPosOfSuffix < 0) {
            return startPosOfSplit;
        }
        else {
            if (startPosOfSuffix < startPosOfImageUrl) {
                return -1;
            }
            if (selectedSuffix.match(/\s+/)) {
                return startPosOfSuffix;
            }
            return startPosOfSuffix + selectedSuffix.length;
        }
    }
    getSplitOfImageUrl(editor, startIndexOfImageUrl) {
        if (!editor) {
            return -1;
        }
        let startPosOfSplit = this.indexOfSplit(editor, startIndexOfImageUrl.pos + startIndexOfImageUrl.mark.length).pos;
        if (startPosOfSplit < 0) {
            startPosOfSplit = editor.document.getText().length;
        }
        return startPosOfSplit;
    }
    getFirstSelectedImageUri(editor) {
        if (!editor) {
            return "";
        }
        // 获取当前鼠标选中段落的起始位置        
        const startPosOfSelectionText = editor.document.offsetAt(editor.selection.anchor);
        const startIndexOfImageUrl = this.lastIndexOfPrefix(editor, startPosOfSelectionText);
        const startPosOfImageUrl = startIndexOfImageUrl.pos;
        if (startPosOfImageUrl < 0) {
            return "";
        }
        const startPosOfSplit = this.getSplitOfImageUrl(editor, startIndexOfImageUrl);
        const endNextPosOfImageUrl = this.getEndOfImageUrl(editor, startPosOfImageUrl, startPosOfSplit);
        if (endNextPosOfImageUrl < 0) {
            return "";
        }
        const imgSrcUri = editor.document.getText().slice(startPosOfImageUrl, endNextPosOfImageUrl);
        return imgSrcUri.trim();
    }
    // 生成预览编辑页面
    async generatePreviewSnippet(editor) {
        if (!editor) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getWindowErrorMessage());
        }
        const imageUri = this.getFirstSelectedImageUri(editor);
        if (!imageUri || imageUri.length <= 0) {
            return htmlPreview_1.HtmlPreview.errorSnippet(this.getErrorMessage());
        }
        const targetImageUri = imageUri; //await HtmlUtil.fixImageRedirectUrl(imageUri);
        const head = htmlPreview_1.HtmlPreview.fixImageSrcLinks(htmlPreview_1.HtmlPreview.createLocalSource(htmlPreview_1.SourceType.LINK, "header_fix.css"));
        const body = htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.DIVISION, targetImageUri) +
            htmlPreview_1.HtmlPreview.createRemoteSourceAtNewline(htmlPreview_1.SourceType.HR) +
            htmlPreview_1.HtmlPreview.createRemoteSource(htmlPreview_1.SourceType.CUSTOM_NEWLINE) +
            htmlPreview_1.HtmlPreview.fixImageSrcLinks(this.imageSrcSnippet(targetImageUri));
        return htmlPreview_1.HtmlPreview.createFullHtmlSnippetFrom(head, body);
    }
}
exports.ImageDocumentContentManager = ImageDocumentContentManager;

//# sourceMappingURL=imageDocumentContentManager.js.map
