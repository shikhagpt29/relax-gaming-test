import {SlotClass} from "../SlotClass";
import * as PIXI from "pixi.js";
import {ReelController} from "./ReelController";
import {ReelView} from "./ReelView";
import {Constants} from "../utils/Constants";

export class ReelAreaView extends PIXI.Container {
    private _reelViews: ReelView[] = [];

    constructor() {
        super();
        SlotClass._app.stage.addChild(this);
        this.createReelMask();
        this.resize();
    }

    public addReelView(reel: ReelController) {
        this._reelViews[reel.reelId] = reel.view;
        this.addChild(reel.view as PIXI.Container);
    }

    resize() {
        this.pivot.x = (Constants.SYMBOL_WIDTH * 3) / 2;
        this.pivot.y = (Constants.SYMBOL_HEIGHT * 3) / 2;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
    }

    private createReelMask(): PIXI.Graphics {
        const SymbolWidth: number = Constants.SYMBOL_WIDTH;
        const maskH: number = Constants.SYMBOL_WIDTH * 3;
        const gpx = new PIXI.Graphics();
        gpx.beginFill(0x8000ff);
        gpx.drawRect(0, 0, 40 + SymbolWidth * 3, maskH);
        gpx.alpha = 0.5;
        this.addChild(gpx);
        gpx.position.set(-70, -SymbolWidth / 2);
        this.mask = gpx;
        return gpx;
    }
}
