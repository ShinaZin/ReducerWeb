export default class FlowSplitter {
    private _text: string;
    private _delims: string;
    private _lastdelims: string;
    constructor(text: string, delims: string) {
        this._text = text;
        this._delims = delims;
    }
    public get lastDelims(): string {
        return this._lastdelims;
    }
    public get length(): number {
        return this._text.length;
    }
    public GetNext(): string {
        let res = '';
        this._lastdelims = '';
        // Пока текущие символы - буквы
        while (
            this._text.length !== 0 &&
            this._delims.indexOf(this._text[0]) === -1
        ) {
            res += this._text[0];
            this._text = this._text.slice(1);
        }

        // Пока текущие символы - разделители
        while (
            this._text.length !== 0 &&
            this._delims.indexOf(this._text[0]) !== -1
        ) {
            this._lastdelims += this._text[0];
            this._text = this._text.slice(1);
        }

        return res;
    }
}
