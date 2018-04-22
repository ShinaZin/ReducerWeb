const translationMapRu = new Map<string, string>();

export function loc(words: string) {
    return translationMapRu.has(words) ? translationMapRu[words] : words;
}

translationMapRu['Error'] = 'Ошибка';
