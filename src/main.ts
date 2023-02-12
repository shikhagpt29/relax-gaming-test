/**
 * Created by shikha on 2023-01-14.
 */

declare global {
    interface Window {
        PIXI: any;
    }
}
window.PIXI = PIXI;
import * as PIXI from "pixi.js";

import {SlotClass} from "./SlotClass";

const app = new SlotClass();



