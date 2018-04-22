import * as $ from 'jquery';
import 'metro-dist/css/metro-colors.css';
export namespace Metro {
    export function notify(
        caption: string = '',
        message: string = '',
        type: 'success' | 'info' | 'warning' | 'alert' = 'info',
        keepOpen: boolean = false,
        timeout?: number
    ) {
        ($ as any).Notify({
            caption: caption,
            content: message,
            type: type,
            keepOpen: keepOpen,
            timeout: timeout ? timeout : getTimeOut(message)
        });
    }

    export function dialog(
        title: string = '',
        content: string = '',
        type: 'success' | 'info' | 'warning' | 'alert' = 'info',
        windowsStyle: boolean = true,
        overlay: boolean = false,
        overlayClickClose: boolean = true
    ) {
        ($ as any).Dialog({
            title: `<h1>${title}</h1>`,
            content: `<h5>${content}</h5>`,
            options: {
                type,
                windowsStyle,
                overlay,
                overlayClickClose,
                overlayColor: 'op-gray'
            }
        });
    }

    function getTimeOut(content: string) {
        const wordsCount = content.split(/[\s,:!?;'"().\[\]]+/).length;
        const wordsPerMinute = 200;
        return Math.round(wordsCount * 60 * 1000 / wordsPerMinute) + 1000;
    }
}
