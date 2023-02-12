import {EventEmitter} from "eventemitter3";

export class SlotEventEmitter {
    private emitter: EventEmitter;

    constructor() {
        this.emitter = new EventEmitter();
    }

    subscribeEvents(eventName: string, callback: any) {
        this.emitter.on(eventName, callback);
    }

    emit(eventName: string, args?: any) {
        this.emitter.emit(eventName, args);
    }
}

