import {Constants} from "../utils/Constants";
import {gsap} from "gsap";
import {SpinAnimator} from "./SpinAnimator";
import {ReelView} from "./ReelView";
import {SlotClass} from "../SlotClass";
import {GameEvents} from "../event/GameEvents";
import {Symbol} from "../symbol/Symbol";
import {SymbolFactory} from "../symbol/SymbolFactory";
import {IResult} from "../data/SlotModel";

export class ReelController {
    public spinAnimator: SpinAnimator;
    public reelId: number = 0;
    protected _reelView: ReelView;
    private _isReelStop: boolean = false;
    private _remainingSteps: number = 0;
    private allSymbols: Symbol[] = [];
    private _symW: number = Constants.SYMBOL_WIDTH;
    private _responseObj: IResult;

    constructor(reelId: number) {
        this.createReelViews(reelId);
        this.createReelAnimator(reelId);
        this.reelId = reelId;
        this.initReelStrips();
        this.addEventListeners();
    }

    get view(): ReelView {
        return this._reelView;
    }

    stopStepCompleted() {
        this._remainingSteps--;
        if (this._remainingSteps) {
            this.removeBottomSymbol(this.allSymbols.pop()!);
            this.updateStoppingSymbol(this.addSymbol());
            if (this._remainingSteps === 1) {
                this.spinAnimator.setBouncingTarget();
                this.removeBottomSymbol(this.allSymbols.pop()!);
                this.addSymbolOnTop(this.createNextSymbol(), -this._symW * 2);
            }
            this.stoppingAnimation();
        }
    }

    stoppingAnimation() {
        const timeline = new gsap.core.Timeline();
        timeline.add(this.spinAnimator.stopAnimation());
        timeline.add(() => {
            this.stopStepCompleted();
        });
    }

    updateStoppingSymbol(symbol: Symbol) {
        const reelResp = this._responseObj.symbolIDs[this._remainingSteps - 1];
        const actualSymID = reelResp[this.reelId];
        symbol.updateSymbol(actualSymID);
    }

    startStoppingAnimation(): void {
        const timeline = new gsap.core.Timeline();
        timeline.add(this.spinAnimator.stopAnimation());
        timeline.add(() => {
            this.stopStepCompleted();
        });
    }

    addNewSymbol(newSymbol: Symbol, positionY: number) {
        newSymbol.setPosition(positionY);
        this.allSymbols.push(newSymbol);
        this._reelView.addChildOnView(newSymbol);
    }

    removeBottomSymbol(bottomSym: Symbol): void {
        this._reelView.removeChildOnView(bottomSym);
        SymbolFactory.freeSymbolToPool(bottomSym);
    }

    createNextSymbol(): Symbol {
        return SymbolFactory.getPoolSymbol();
    }

    addSymbolOnTop(symbol: Symbol, posY: number): void {
        symbol.setPosition(posY);
        this.allSymbols.unshift(symbol);
        this._reelView.addChildOnTop(symbol);
    }

    addSymbol(): Symbol {
        const symbol = this.createNextSymbol();
        const posY: number = -this._symW;
        this.addSymbolOnTop(symbol, posY);
        return symbol
    }

    spinSpinAnimation() {
        const timeline = new gsap.core.Timeline();
        timeline.add(this.spinAnimator.spinSpinAnimation());
        timeline.add(() => {
            this.onSpinStepCompleted();
        });
    }

    onSpinStepCompleted() {
        if (!this._isReelStop) {
            this.removeBottomSymbol(this.allSymbols.pop()!);
            this.addSymbol();
            this.spinSpinAnimation();
        } else {
            this._remainingSteps = Constants.NUM_OF_SYMS;
            this.removeBottomSymbol(this.allSymbols.pop()!);
            this.updateStoppingSymbol(this.addSymbol());
            this.startStoppingAnimation();
        }
    }

    public startReelSpinAnimation(): gsap.core.Timeline {
        this._isReelStop = false;
        const timeline = new gsap.core.Timeline();
        timeline.add(this.spinAnimator.getSpinStartAnimation());
        timeline.add(() => {
            this.onSpinStepCompleted();
        });
        return timeline;
    }

    private addEventListeners() {
        SlotClass.eventEmitter.subscribeEvents(GameEvents.RESPONSE_RECEIVED, (data: IResult) => {
            this.onResponseReceived(data);
        });
        SlotClass.eventEmitter.subscribeEvents(GameEvents.REEL_STOP, () => this._isReelStop = true);
    }

    private onResponseReceived(data: any) {
        this._responseObj = data;
    }

    private initReelStrips() {
        for (let symID: number = 0; symID < Constants.NUM_OF_SYMS; symID++) {
            const newSymbol = this.createNextSymbol();
            this.addNewSymbol(newSymbol, this._symW * symID);
        }
        const topExtraSymbol = this.createNextSymbol();
        const posY: number = -this._symW;
        this.addSymbolOnTop(topExtraSymbol, posY);

        const bottomExtraSymbol = this.createNextSymbol()
        const bottomY = this._symW * Constants.NUM_OF_SYMS;
        this.addNewSymbol(bottomExtraSymbol, bottomY);
        this.spinAnimator.setAllSymbols(this.allSymbols);
    }

    private createReelViews(reelId: number): void {
        this._reelView = new ReelView(reelId);
    }

    private createReelAnimator(reelId: number): void {
        this.spinAnimator = new SpinAnimator(reelId);
        this.spinAnimator.setAllSymbols(this.allSymbols);
    }
}
