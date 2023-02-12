import {SlotClass} from "../SlotClass";

/**
 * Created by shikha on 2023-02-06.
 */
export class Utils {
    public static onResize(): void {
        if (!SlotClass._app) {
            return;
        }
        if ((SlotClass._app.stage.children.length > 0)) {
            (SlotClass._app.stage.children).forEach((eachCh: any) => {
                if (eachCh.resize) {
                    eachCh.resize();
                }
            });
        }
    }
}
