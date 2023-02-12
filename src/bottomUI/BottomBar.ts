import * as PIXI from "pixi.js";
import {gsap} from "gsap";
import {SlotClass} from "../SlotClass";
import {GameEvents} from "../event/GameEvents";
import {Balance} from "./Balance";
import {Win} from "./Win";
import {Bet} from "./Bet";

export interface ICounter {
    value: number
}

export class BottomBar extends PIXI.Container {
    private _bottomContainer: PIXI.Container;
    private _betContainer: Bet;
    private _balanceContainer: Balance;
    private _winContainer: Win;
    private _bar: PIXI.Graphics;

    constructor() {
        super();
        this.init();
        this.addEventListeners();
    }

    public getCountAnimation(prize: number): void {
        const balance: number = this._balanceContainer.getCurrentBalance();
        const counter: ICounter = {value: balance};
        gsap.to(counter, {
            value: this._balanceContainer.getUpdatedBalance(prize, balance),
            delay: 0.1,
            duration: 0.1,
            onUpdate: () => {
                this._balanceContainer.updateBalance(Math.ceil(counter.value).toString());
            }, onComplete: () => {
                SlotClass.eventEmitter.emit(GameEvents.ROUND_END);
                this._winContainer.updateWinValue(prize.toString());
            }
        });
    }

    public onBet(): void {
        const balance: number = this._balanceContainer.getCurrentBalance()
        const betNum: number = this._betContainer.getCurrentStake();
        this._balanceContainer.updateBalance((balance - betNum).toString());
        this._winContainer.updateWinValue('');
    }

    resize(): void {
        const marginFromBottom: number = 80;
        this.createGraphics(window.innerWidth, 100);
        this.y = window.innerHeight - marginFromBottom;
        this._bottomContainer.pivot.x = this._bottomContainer.width / 2;
        this._bottomContainer.x = window.innerWidth / 2 - 100;
        this._bottomContainer.y = 0;
    }

    createGraphics(width: number, height: number): PIXI.Graphics {
        this._bar.clear();
        this._bar.beginFill(0xDDDDDD);
        this._bar.alpha = 1;
        this._bar.drawRect(0, -5, width, height);
        return this._bar;
    }

    private addEventListeners() {
        SlotClass.eventEmitter.subscribeEvents(GameEvents.START_SPIN, () => {
            this.onBet();
        });
        SlotClass.eventEmitter.subscribeEvents(GameEvents.COUNT_UP, (prize: number) => {
            this.getCountAnimation(prize);
        });
    }

    private init(): void {
        this._bottomContainer = new PIXI.Container();
        this._bar = new PIXI.Graphics();
        this.createGraphics(window.innerWidth, 100);
        this._betContainer = new Bet();
        this._balanceContainer = new Balance();
        this._winContainer = new Win();
        this.addChild(this._bar, this._bottomContainer);
        this._bottomContainer.addChild(this._winContainer, this._balanceContainer, this._betContainer);
        this.resize();
        SlotClass._app.stage.addChild(this);
    }
}
