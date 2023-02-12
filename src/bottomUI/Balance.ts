import * as PIXI from "pixi.js";
import {Constants} from "../utils/Constants";

export class Balance extends PIXI.Container {
    private _balanceText: PIXI.Text;
    private _balanceNum: PIXI.Text;
    private _currency: String = Constants.Currency;

    constructor() {
        super();
        this.init();
    }

    updateBalance(updatedVal: string): void {
        this._balanceNum.text = this._currency + updatedVal;
    }

    getCurrentBalance(): number {
        return Number(this._balanceNum.text.substring(1));
    }

    getUpdatedBalance(prize: number, balance: number): number {
        return prize + balance;
    }

    private init() {
        this._currency = "$";
        this._balanceText = new PIXI.Text("Balance", {fill: 0x000});
        this._balanceNum = new PIXI.Text(this._currency + "1000", {fill: 0x000});
        this._balanceNum.position.set(250, 0);
        this._balanceText.position.set(250, 40);
        this.addChild(this._balanceText, this._balanceNum);
    }
}
