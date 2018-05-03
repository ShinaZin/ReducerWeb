import axios from 'axios';

export async function getFishText(
    count: number,
    type: 'sentence' | 'paragraph' = 'paragraph'
): Promise<string> {
    const params = '&type=' + type + '&number=' + count;
    const response = await axios.get('https://fish-text.ru/get?' + params);
    if (response.status !== 200) {
        return response.statusText;
    }
    const result: { status: any, text: string, errorCode?: any } = response.data;
    if (result.status === 'success') {
        const text = result.text.replace(/\\n\\n/g, '\n\n');
        return text;
    } else {
        return result.errorCode + '\n' + result.text;
    }
}