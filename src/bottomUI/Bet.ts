import * as PIXI from "pixi.js";
import {Constants} from "../utils/Constants";

export class Bet extends PIXI.Container {
    private _betText: PIXI.Text;
    private _betNum: PIXI.Text;
    private _currency: String = Constants.Currency;

    constructor() {
        super();
        this.init();
    }

    getCurrentStake(): number {
        return Number(this._betNum.text.substring(1));
    }

    updateCurrentStake(stakeVal: string): void {
        this._betNum.text = stakeVal;
    }

    private init() {
        this._currency = "$";
        this._betNum = new PIXI.Text(this._currency + "2.00", {fill: 0x000});
        this._betText = new PIXI.Text("BET", {fill: 0x000});
        this._betNum.position.set(60, 0);
        this._betText.position.set(60, 40);
        this.addChild(this._betText, this._betNum);
    }
}
