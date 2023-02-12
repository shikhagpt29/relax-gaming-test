import {Back, Elastic, gsap, Linear} from "gsap";
import {Symbol} from "../symbol/Symbol";
import {Constants} from "../utils/Constants";

export class SpinAnimator {
    private _reelId: number;
    private _symbolsToSpin: Symbol[];
    private _bouncingTargetReached: boolean = false;

    constructor(reel: number) {
        this._reelId = reel;
    }

    getSpinStartAnimation() {
        this._bouncingTargetReached = false;
        const timeline: gsap.core.Timeline = gsap.timeline();
        for (let i: number = 0; i < this._symbolsToSpin.length; i++) {
            timeline.add(this.spinStartingStep(this._symbolsToSpin[i], 0.2), 0);
        }
        return timeline;
    }

    public spinStartingStep(symbol: Symbol, speed: number): gsap.core.Timeline {
        const nextPosY: number = Constants.SYMBOL_HEIGHT;
        const timeline: gsap.core.Timeline = new gsap.core.Timeline();
        const symY = symbol.y - nextPosY / 2;
        const posY = symbol.y + nextPosY;
        timeline.to(symbol, {duration: speed, y: symY, ease: Back.easeIn.config(4)}, 0);
        timeline.to(symbol, {duration: speed, y: posY, ease: Linear.easeNone}, speed);
        return timeline;
    }

    public spinSpinAnimation(): gsap.core.Timeline {
        const timeline = new gsap.core.Timeline();
        for (let i: number = 0; i < this._symbolsToSpin.length; i++) {
            timeline.add(this.moveSymbolOneStep(this._symbolsToSpin[i]), 0);
        }
        return timeline;
    };

    public stopAnimation() {
        const timeline: gsap.core.Timeline = new gsap.core.Timeline();
        for (let i: number = 0; i < this._symbolsToSpin.length; i++) {
            timeline.add(this.moveSymbolOneStep(this._symbolsToSpin[i]), 0);
        }
        return timeline;
    }

    public moveSymbolOneStep(symbol: Symbol): gsap.core.Timeline {
        const nextPosY: number = Constants.SYMBOL_HEIGHT;
        const timeline: gsap.core.Timeline = new gsap.core.Timeline();
        const positionY = symbol.y + nextPosY;
        const stopSpeed = this._bouncingTargetReached ? 0.5 : Constants.SPIN_SPEED;
        const stopEase = this._bouncingTargetReached ? Elastic.easeOut.config(2.5, 0.3) : Linear.easeNone;
        timeline.to(symbol, {duration: stopSpeed, y: positionY, ease: stopEase});
        return timeline;
    }

    public setAllSymbols(symbols: Symbol[]): void {
        this._symbolsToSpin = symbols;
    }

    public setBouncingTarget() {
        this._bouncingTargetReached = true;
    }
}
