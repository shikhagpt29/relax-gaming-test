import {gsap} from "gsap";
import {SlotClass} from "../SlotClass";
import {IResult} from "../data/SlotModel";
import {GameEvents} from "../event/GameEvents";
import {Reels} from "../reels/Reels";
import {Symbol} from "../symbol/Symbol";

export class WinPresent {
    private _responseData: IResult;

    constructor() {
        this.addEventListeners();
    }

    public showWinPresent(): void {
        const winAmount = this._responseData.win;
        const isWin: boolean = winAmount > 0;
        if (isWin) {
            this.showSymbolAnimation();
            this.playCountUpAnimation(winAmount);
        } else {
            SlotClass.eventEmitter.emit(GameEvents.ROUND_END);
        }
    }

    private addEventListeners() {
        SlotClass.eventEmitter.subscribeEvents(GameEvents.RESPONSE_RECEIVED, (data: any) => {
            this.onResponseReceived(data);
        });
        SlotClass.eventEmitter.subscribeEvents(GameEvents.START_WIN_PRESENTATION, () => {
            this.showWinPresent()
        });
    }

    private onResponseReceived(data: any) {
        this._responseData = data
    }

    private showSymbolAnimation(): void {
        const timeline = new gsap.core.Timeline();
        const delay: number = 0.5;
        this._responseData.betData!.forEach((eachWinningObj: any) => {
            eachWinningObj.winPositions.forEach((displayArr: boolean[], symId: number) => {
                displayArr.forEach((isWin, reelId) => {
                    let reel = (Reels.getReels(reelId));
                    let reelView = reel.view;
                    let reelSymbol = (reelView.getChildAt(symId + 1) as Symbol);
                    if (isWin) {
                        timeline.add(() => {
                            reelSymbol.playWinAnimation();
                        }, 0.1 + (symId * delay));
                    }
                });
            })
        })
    }

    private playCountUpAnimation(winAmount: number): void {
        SlotClass.eventEmitter.emit(GameEvents.COUNT_UP, winAmount);
    }
}
