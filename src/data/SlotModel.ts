import {Constants} from "../utils/Constants";
import {Response} from "./Response";
import {SlotClass} from "../SlotClass";
import {GameEvents} from "../event/GameEvents";

/**
 * Created by shikha on 2023-01-14.
 */
export interface IResponse {
    "response": { "results": IResult }
}

export interface IResult {
    betData?: { sym: number; winPositions: boolean[][] }[];
    "win": number,
    "symbolIDs": number[][]
}

export class SlotModel {
    public static nonMatching: number[] = [];
    public static JSONData: IResponse[] = Response.JSONData;
    private static responseObj: IResult = {
        win: 0,
        symbolIDs: [[]],
    }

    static generateResponse(): IResult {
        const randomPick: number = Math.floor((Math.random() * SlotModel.JSONData.length));
        const response = SlotModel.JSONData[randomPick];
        this.responseObj = response.response.results;
        SlotClass.eventEmitter.emit(GameEvents.RESPONSE_RECEIVED, this.responseObj);
        this.calculateWinsForEachPos();
        return this.responseObj;
    }

    static createWinPositionObj(sym: number, reelWinPosition: boolean[][]) {
        return {"sym": sym, winPositions: reelWinPosition}
    }

    private static calculateWinsForEachPos() {
        const betData: { sym: number; winPositions: boolean[][]; }[] = [];
        const firstColumn: number[] = [];
        this.responseObj.symbolIDs.forEach((eachRow) => {
            firstColumn.push(eachRow[0]);
        });
        firstColumn!.forEach((sym, reelId: number) => {
            const winPositions = this.calculateReelWinPos(sym, reelId);
            betData.push(this.createWinPositionObj(sym, winPositions))
        });
        this.responseObj.betData = betData;
        console.log("responseData", this.responseObj);
    }

    private static calculateReelWinPos(sym: number, reelId: number): boolean[][] {
        const reelLength = Constants.REELS_NUM;
        const symLength = Constants.NUM_OF_SYMS;
        const reelWinPos = [...new Array(reelLength)].map(() => [...new Array(symLength)].map(() => false));
        let connectedReel: boolean = false;
        let count = 0;
        for (let symId: number = 0; symId < symLength; symId++) {
            if (this.responseObj.symbolIDs[reelId][symId] === sym) {
                reelWinPos[reelId][symId] = true;
                connectedReel = true;
                count++;
            } else {
                connectedReel = false;
            }
            if (!connectedReel) {
                if (count >= 2) {
                    symId > 0 && (reelWinPos[reelId][symId - 1] = true);
                } else {
                    reelWinPos[reelId][0] = false;
                }
                break;
            }
        }
        return reelWinPos;
    }
}
