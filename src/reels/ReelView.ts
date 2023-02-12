import * as PIXI from "pixi.js";
import {Constants} from "../utils/Constants";
import {Symbol} from "../symbol/Symbol";

export class ReelView extends PIXI.Container {
    private _symW: number = Constants.SYMBOL_WIDTH;

    constructor(reelId: number) {
        super();
        this.x = reelId * this._symW;
    }

    removeChildOnView(bottomSym: Symbol): void {
        this.removeChild(bottomSym);
    }

    addChildOnTop(newSymbol: Symbol) {
        this.addChildAt(newSymbol, 0);
    }

    addChildOnView(child: Symbol) {
        this.addChild(child);
    }
}
