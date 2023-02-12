import {ReelController} from "./ReelController";
import {Constants} from "../utils/Constants";
import gsap from "gsap";
import {ReelAreaView} from "./ReelAreaView";
import {SlotClass} from "../SlotClass";
import {GameEvents} from "../event/GameEvents";
import {SymbolFactory} from "../symbol/SymbolFactory";

export class Reels {
    public static _reels: ReelController[] = [];
    protected static instance: Reels;
    private static _reelAreaView: ReelAreaView;

    constructor() {
        if (Reels.instance) {
            debugger;
            throw new Error("Error: Reels.constructor() - Instantiation failed: Singleton.");
        }
        this.addEventListeners();
    }

    static init() {
        SymbolFactory.createSymbolPool();
        Reels.instance = new Reels();
        Reels._reelAreaView = new ReelAreaView();
        for (let reelId = 0; reelId < Constants.REELS_NUM; reelId++) {
            const reel = new ReelController(reelId);
            Reels._reels[reelId] = reel;
            Reels._reelAreaView.addReelView(reel);
        }
    }

    static getReels(reelId: number) {
        return Reels._reels[reelId];
    }

    private addEventListeners(): void {
        SlotClass.eventEmitter.subscribeEvents(GameEvents.REEL_SPIN_STARTED, () => {
            this.onSpinStart();
        });
    }

    private onSpinStart(): void {
        const timeline = new gsap.core.Timeline();
        for (let reelId: number = 0; reelId < Constants.REELS_NUM; reelId++) {
            timeline.add(() => {
                Reels._reels[reelId].startReelSpinAnimation()
            }, 0);
        }
    };
}
