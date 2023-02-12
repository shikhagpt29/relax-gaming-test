/**
 * Created by shikha on 2023-02-06.
 */
import {Constants} from "../utils/Constants";
import {SlotClass} from "../SlotClass";
import gsap from "gsap";
import {GameEvents} from "../event/GameEvents";
import {SpinButton} from "./SpinButton";
import {SlotModel} from "../data/SlotModel";

export class Main {
    private _spinBtn: SpinButton;

    constructor() {
        this.init();
    }

    public spinStart(): gsap.core.Timeline {
        const tl: gsap.core.Timeline = gsap.timeline({
            onComplete: () => {
                SlotClass.eventEmitter.emit(GameEvents.START_WIN_PRESENTATION);
            },
            onStart: () => {
                SlotClass.eventEmitter.emit(GameEvents.REEL_SPIN_STARTED);
                SlotModel.generateResponse();
            }
        });
        tl.add(() => {
            SlotClass.eventEmitter.emit(GameEvents.REEL_STOP);
        }, Constants.SPIN_TIME)
        tl.add(() => {

        }, Constants.SPIN_TIME + 1)
        return tl;
    }

    private init(): void {
        this._spinBtn = new SpinButton();
        SlotClass._app.stage.addChild(this._spinBtn);
        this.addEventListener();
    }

    private addEventListener(): void {
        SlotClass.eventEmitter.subscribeEvents(GameEvents.START_SPIN, () => {
            this.spinStart();
        });
    }
}
