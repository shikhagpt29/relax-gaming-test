/**
 * Created by shikha on 2023-01-14.
 */
import * as PIXI from "pixi.js";
import {Utils} from "./utils/Utils";
import {Main} from "./base/Main";
import {BottomBar} from "./bottomUI/BottomBar";
import {WinPresent} from "./win/WinPresent";
import {SlotEventEmitter} from "./event/SlotEventEmitter";
import {Reels} from "./reels/Reels";

export class SlotClass {
    public static _app: PIXI.Application;
    public static assetLoader: PIXI.Loader;
    public static eventEmitter: SlotEventEmitter;

    constructor() {
        const resolution: number = window.devicePixelRatio > 1 ? 2 : 1;
        SlotClass._app = new PIXI.Application({
            autoStart: true,
            autoDensity: true,
            antialias: false,
            resolution: resolution,
            backgroundColor: 0x000000,
            width: 1280,
            height: 768,
            resizeTo: window
        });

        document.body.appendChild(SlotClass._app.view);
        SlotClass.assetLoader = SlotClass._app.loader;
        this.init();
    }

    initGame() {
        new Main();
        new WinPresent();
        new BottomBar();
        Reels.init();
    }

    protected init(): void {
        SlotClass.assetLoader
            .add("symbol1", "../assets/sym1.png", {crossOrigin: true})
            .add("symbol2", "../assets/sym2.png", {crossOrigin: true})
            .add("symbol3", "../assets/sym3.png", {crossOrigin: true})
            .add("symbol4", "../assets/sym4.png", {crossOrigin: true})
            .add("symbol1_frame", "../assets/sym1_frame.png", {crossOrigin: true})
            .add("symbol2_frame", "../assets/sym2_frame.png", {crossOrigin: true})
            .add("symbol3_frame", "../assets/sym3_frame.png", {crossOrigin: true})
            .add("symbol4_frame", "../assets/sym4_frame.png", {crossOrigin: true})
            .add("spinBtn", "../assets/spin.svg", {crossOrigin: true})
        SlotClass.assetLoader.load((loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => this.onLoadComplete(loader, resources));

        SlotClass.eventEmitter = new SlotEventEmitter();
    }

    protected onLoadComplete(loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>): void {
        this.initGame();
    }

}

window.addEventListener('resize', Utils.onResize);
