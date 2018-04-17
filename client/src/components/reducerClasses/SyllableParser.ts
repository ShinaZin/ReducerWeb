/**
 *  Предоставляет статические методы для работы со слогами в слове
 */
export class SyllableParser {
    // строка с гласными
    private static vowel: string = 'аиоуыэeyuioa'; // аеёиоуыэюя
    // строка с согласными
    private static consonant: string = 'бвгджзйклмнпрстфхцчшщъьqwrtpasdfghjklzxcvbnm'; // бвгджзйклмнпрстфхцчшщъь
    // строка с двухзвучными гласными
    private static doublevowel: string = 'еёюя';

    /**
     * Определяет тип буквы: Vowel (гласная) или Consonant (согласная);
     * в остальных случаях возвращается тип Unknown
     */
    public static GetLetterType(letter: string): LetterType {
        // переводим букву в нижний регистр для удобства
        letter = letter.toLowerCase();

        // проверка на гласную букву
        if (SyllableParser.vowel.includes(letter)) {
            return LetterType.Vowel;
        }
        // проверка на согласную букву
        if (SyllableParser.consonant.includes(letter)) {
            return LetterType.Consonant;
        }
        // двухзвучная буква "еёюя"
        if (SyllableParser.doublevowel.includes(letter)) {
            return LetterType.DoubleVowel;
        }
        // иначе неопределенная буква
        return LetterType.Unknown;
    }

    /**
     * Разделяет слово по слогам альтернативным способом
     * @param word исходное слово
     * @returns массив слогов или NULL в случае ошибки
     */
    public static ParseAlt(word: string): string[] {
        let vowelIndexes: number[] = [];

        for (let i = 0; i < word.length; i++) {
            let symbol: string = word.substr(i, 1);
            if (
                SyllableParser.GetLetterType(symbol[0]) === LetterType.Vowel ||
                SyllableParser.GetLetterType(symbol[0]) ===
                    LetterType.DoubleVowel
            ) {
                vowelIndexes.push(i);
            }
        }
        let result: string = '';
        for (let i = vowelIndexes.length - 1; i > 0; i--) {
            if (vowelIndexes[i] - vowelIndexes[i - 1] === 1) {
                continue;
            }
            let n = vowelIndexes[i] - vowelIndexes[i - 1] - 1;
            result =
                '-' + word.substring(vowelIndexes[i - 1] + 1 + n / 2) + result;
            word = word.slice(0, vowelIndexes[i - 1] + 1 + n / 2); // ?Remove с индекса по конец
        }
        result = word + result;

        for (let i = result.length - 1; i > 1; i--) {
            if (
                (SyllableParser.GetLetterType(result[i]) ===
                    LetterType.DoubleVowel &&
                    SyllableParser.GetLetterType(result[i - 1]) ===
                        LetterType.DoubleVowel) ||
                (SyllableParser.GetLetterType(result[i]) ===
                    LetterType.DoubleVowel &&
                    SyllableParser.GetLetterType(result[i - 1]) ===
                        LetterType.Vowel) ||
                (SyllableParser.GetLetterType(result[i]) === LetterType.Vowel &&
                    SyllableParser.GetLetterType(result[i - 1]) ===
                        LetterType.Vowel)
            ) {
                result = result.substr(0, i) + '-' + result.substr(i);
            }
            // result.insert( i, "-" );//
        }
        return result.split('-');
    }

    /**
     * Определяет, есть ли в строке гласная буква
     * @param word исходное слово
     * @returns ИСТИНА, если имеет гласную, в противном случае ЛОЖЬ
     */
    public static HasVowel(word: string): boolean {
        if (word == null) {
            return false;
        }
        for (let i = 0; i < word.length; i++) {
            if (SyllableParser.GetLetterType(word[i]) === LetterType.Vowel) {
                return true;
            }
        }
        return false;
    }

    /**
     * Определяет, есть ли в строке согласная буква
     * @param word исходное слово
     * @returns ИСТИНА, если в строке есть согласная, в противном случае ЛОЖЬ
     */
    public static HasConsonant(word: string): boolean {
        if (word == null) {
            return false;
        }
        for (let i = 0; i < word.length; i++) {
            if (
                SyllableParser.GetLetterType(word[i]) === LetterType.Consonant
            ) {
                return true;
            }
        }
        return false;
    }
}
/**
 * Тип буквы (гласная или согласная)
 */
export enum LetterType {
    /**
     * Не гласная и не согласная
     */
    Unknown,
    /**
     * Гласная
     */
    Vowel,
    /**
     * Согласная
     */
    Consonant,
    /**
     * Двухзвучная гласная
     */
    DoubleVowel
}
