import { OptionsParams } from '../Options';
import FlowSplitter from './FlowSplitter';
import ReducerSettings from './ReducerSettings';
import { LetterType, SyllableParser } from './SyllableParser';

export default class Reducer {
    constructor(op: OptionsParams) {
        ReducerSettings.MaxSyllables = op.maxSyllables || 4;
        ReducerSettings.VowelsDeletePercent = op.vowelsDeletePercent || 0;
        ReducerSettings.DeleteNewLineSymbols = op.deleteNewLineSymbols || false;
        ReducerSettings.DeleteSpacesAndTabs = op.deleteSpacesAndTabs || false;
        ReducerSettings.SyllablesToHyphen = op.syllablesToHyphen || 5;
    }

    // Преобразующие текст функции
    /**
     * Главная функция, вызывающая остальные функции сокращения
     * @param inputStr Входная строка
     */
    public ReduceTheText(inputStr: string): string {
        if (inputStr.length === 0) {
            // console.log('Введите текст для сокращения!', 'Ошибка');
            return '';
        }
        let flowSplitter = new FlowSplitter(
            inputStr,
            '@#$;:!?%^&"\',./-_=~`\\+*\t\n\r(){}[]<> '
        );
        let outputStr = '';
        while (flowSplitter.length > 0) {
            // Получаем новое слово
            let word: string = flowSplitter.GetNext();
            let resWord: string = this.RemVowels(
                this.TrimWord(
                    word,
                    ReducerSettings.MaxSyllables,
                    ReducerSettings.SyllablesToHyphen
                ),
                ReducerSettings.VowelsDeletePercent
            );
            // Если длина слова не изменилась или получилось длиннее, то берем оригинал
            if (resWord.length >= word.length) {
                resWord = word;
            }
            outputStr += resWord;
            // Дописываем разделители
            outputStr += this.RemDelims(
                flowSplitter.lastDelims,
                ReducerSettings.DeleteSpacesAndTabs,
                ReducerSettings.DeleteNewLineSymbols
            );
        }
        return outputStr;
    }
    /**
     * Удаляет гласные буквы из слова
     * @param sInpWord Входная строка (без пробелов)
     * @param intense Интнсивность в процентах
     */
    private RemVowels(sInpWord: string, intense: number): string {
        let res: string = '';
        // Если слово сокращено через дефис, но не удаляем гласные
        if (sInpWord.includes('-')) {
            return sInpWord;
        }
        // Если интенсивность меньше 1, то не удаляем гласные
        if (intense < 2) {
            return sInpWord;
        }
        if (sInpWord.length < 3) {
            return sInpWord;
        }
        // Переводим проценты в "каждый k-й"
        let everyK = 100 / intense;

        // Отбираем все буквы
        let cnt = 0;

        for (let i = 0; i < sInpWord.length; i++) {
            let ch = sInpWord[i];
            let letterType = SyllableParser.GetLetterType(ch);
            if (letterType === LetterType.Consonant) {
                res += ch;
            }
            if (
                letterType === LetterType.Vowel ||
                letterType === LetterType.DoubleVowel
            ) {
                cnt++;
                if (cnt % everyK !== 0) {
                    res += ch;
                } else if (i === sInpWord.length - 1) {
                    // если буква последння
                    res += ch;
                }
            }
            if (letterType === LetterType.Unknown) {
                res += ch;
            }
        }
        // Сохраняем первую гласную
        if (SyllableParser.GetLetterType(sInpWord[0]) === LetterType.Vowel) {
            if (res[0] !== sInpWord[0]) {
                res = sInpWord[0] + res;
            }
        }
        return res;
    }

    /**
     * Сокращает слово
     * @param sInpWord Входная строка
     * @param maxSyll Максимальное число слогов
     * @returns сокращенная строка
     */
    private TrimWord(
        sInpWord: string,
        maxSyll: number,
        syllsToHyphen: number
    ): string {
        let sOutWord: string = '';
        if (sInpWord.length < 3) {
            return sInpWord;
        }

        let Syllables: string[] = SyllableParser.ParseAlt(sInpWord);
        // Сокращаем дефисом
        if (Syllables.length > syllsToHyphen) {
            return Syllables[0] + Syllables[1][0] + '-' + Syllables.slice(-1);
        } else {
            // Берем первые n слогов
            for (let i = 0; i < Syllables.length; i++) {
                sOutWord += Syllables[i];
                if (i >= maxSyll - 1) {
                    // Добавляем 1 согласную букву из следующего слога,
                    if (Syllables.length - 1 >= i + 1) {
                        // если он(слог) есть
                        sOutWord += Syllables[i + 1][0];
                    }

                    // Удаляем все гласные в конце слова
                    while (
                        SyllableParser.GetLetterType(sOutWord.slice(-1)) ===
                            LetterType.Vowel ||
                        SyllableParser.GetLetterType(sOutWord.slice(-1)) ===
                            LetterType.DoubleVowel
                    ) {
                        sOutWord = sOutWord.slice(0, sOutWord.length - 1);
                    } // Remove!!

                    // Добавляенм точку, если сократили слово
                    if (sOutWord.length < sInpWord.length) {
                        sOutWord += '.';
                    }
                    break;
                }
            }
        }

        return sOutWord;
    }
    /**
     * Удаляет разделители из входной строки
     * @param delimsString Входная строка
     * @param DeleteSpaces Флаг удаления пробелов и табуляций
     * @param DeleteNewLines Флаг удаления переводов строк
     * @returns строка без разделителей
     */
    private RemDelims(
        delimsString: string,
        DeleteSpaces: boolean,
        DeleteNewLines: boolean
    ): string {
        let res: string = delimsString;

        if (DeleteNewLines === true) {
            res = res.replace(/[\r\n]+/, ' ');
        }

        if (DeleteSpaces === true) {
            res = res.replace(/[ \t]+/, ' ');
        }
        return res;
    }
}
