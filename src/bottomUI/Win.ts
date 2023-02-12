import * as PIXI from "pixi.js";

export class Win extends PIXI.Container {
    private _winText: PIXI.Text;
    private _winNum: PIXI.Text;

    constructor() {
        super();
        this.init();
    }

    updateWinValue(value: string) {
        if (value === '') {
            this._winNum.text = '';
            return;
        }
        const currency = "$";
        this._winNum.text = `${currency}${value}.00`;
        this._winNum.x = 180 - this._winText.width / 2
    }

    private init() {
        this._winNum = new PIXI.Text("", {fill: 0x000});
        this._winText = new PIXI.Text("WIN", {fill: 0x000});
        this._winNum.position.set(160, 0);
        this._winText.position.set(160, 40);
        this.addChild(this._winText, this._winNum);
    }
}
