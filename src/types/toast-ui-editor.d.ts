declare module '@toast-ui/editor' {
  export interface EditorOptions {
    el: HTMLElement;
    height?: string;
    initialValue?: string;
    initialEditType?: 'markdown' | 'wysiwyg';
    previewStyle?: 'tab' | 'vertical';
    theme?: string;
    usageStatistics?: boolean;
  }

  export default class Editor {
    constructor(options: EditorOptions);
    getMarkdown(): string;
    setMarkdown(markdown: string, cursorToEnd?: boolean): void;
    destroy(): void;
  }
}
