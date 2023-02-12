/**
 * Created by shikha on 2023-02-4.
 */
import * as PIXI from "pixi.js";
import {SlotClass} from "../SlotClass";

export class Button extends PIXI.Container {
    private readonly _sprite: PIXI.Sprite;

    constructor(texture: string) {
        super();
        this.name = texture;
        this._sprite = new PIXI.Sprite(SlotClass.assetLoader.resources[texture].texture)
        this.addChild(this._sprite);
        this.enableButton();
    }

    disableButton(): void {
        this.interactive = false;
        this.buttonMode = false;
        this._sprite.tint = 0x8E8E8E;
    }

    enableButton(): void {
        this.interactive = true;
        this.buttonMode = true;
        this._sprite.tint = 0xFFFFFF;
    }

    getWidth(): number {
        return this._sprite.width;
    }
}
