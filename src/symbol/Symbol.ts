import * as PIXI from "pixi.js";
import {Sprite} from "pixi.js";
import {Constants} from "../utils/Constants";
import {SlotClass} from "../SlotClass";
import {gsap} from "gsap";

export class Symbol extends PIXI.Container {
    private _sprite: PIXI.Sprite;
    private _frame: Sprite;

    constructor(symId: number) {
        super();
        this.name = Constants.SYM_NAMES_MAP[symId];
        this._sprite = this.createSprite(this.getSymbolName(symId));
        this._frame = this.createSprite(this.getFrameName(symId));
    }

    public updateSymbol(symId: number) {
        const texture = this.getSymbolName(symId);
        const frameTexture = this.getFrameName(symId);
        this.name = Constants.SYM_NAMES_MAP[symId];
        this._sprite.texture = SlotClass.assetLoader.resources[texture].texture!;
        this._frame.texture = SlotClass.assetLoader.resources[frameTexture].texture!;
    }

    setPosition(value: number) {
        this.y = value;
    }

    public playWinAnimation() {
        const timeline = new gsap.core.Timeline();
        timeline.add(gsap.to(this._sprite.scale, 0.2, {x: 1, y: 1}), 0);
        timeline.add(gsap.to(this._sprite.scale, 0.2, {x: 0.5, y: 0.5}), 0.35);
    }

    private createSprite(texture: string): Sprite {
        const spine = new PIXI.Sprite(SlotClass.assetLoader.resources[texture].texture);
        spine.anchor.set(0.5);
        spine.scale.set(0.5);
        this.addChild(spine);
        return spine;
    }

    private getSymbolName(symId: number): string {
        return `symbol${symId + 1}`;
    }

    private getFrameName(symId: number): string {
        return `symbol${symId + 1}_frame`;
    }
}
