import {Button} from "../utils/Button";
import {SlotClass} from "../SlotClass";
import {GameEvents} from "../event/GameEvents";

export class SpinButton extends Button {
    constructor() {
        super("spinBtn");
        this.addEventListener();
        this.resize();
    }

    disableSpin(): void {
        this.disableButton();
    }

    enableSpin(): void {
        this.enableButton();
    }

    private resize() {
        this.pivot.x = this.width / 2;
        this.pivot.y = this.height / 2;
        this.x = window.innerWidth / 2 + 300;
        this.y = window.innerHeight / 2 - 50;
        this.scale.set(0.8);
    }

    private addEventListener(): void {
        this.on('pointertap', () => this.onSpinPress());
        SlotClass.eventEmitter.subscribeEvents(GameEvents.ROUND_END, () => this.enableSpin());
    }

    private onSpinPress(): void {
        this.disableSpin();
        // spin start from here
        SlotClass.eventEmitter.emit(GameEvents.START_SPIN);
    }

}
