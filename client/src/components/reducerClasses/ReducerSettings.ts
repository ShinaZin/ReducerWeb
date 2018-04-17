export default class ReducerSettings {
    public static MaxSyllables: number;
    public static VowelsDeletePercent: number;
    public static DeleteSpacesAndTabs: boolean;
    public static DeleteNewLineSymbols: boolean;
    public static SyllablesToHyphen: number;
    public static HelpString: string = `Помощь по работе из командной строки:
--------------
Использование:
    1)Reducer [имя файла]
    2)Reducer -i имя файла [необязательные ключи (-o xxx -s -n ..)]
Ключи:
    -i имя входного файла
    -o имя выходного файла
    -s - если задан, то будут удалены повторяющиеся пробелы и табуляции
    -n - удаление всех переводов строк
    -ms число - максимальное число слогов
    -mh число - минимальное число слогов для сокращения через дефис
    -dv число - процент удаляемых гласных
`;
}
