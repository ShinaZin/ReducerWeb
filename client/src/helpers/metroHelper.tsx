import * as $ from 'jquery';
export function notify(caption = '', message = '', type: 'success' | 'info' | 'warning' | 'alert' = 'info') {
    ($ as any).Notify({
        caption: caption,
        content: message,
        type: type
    });
}