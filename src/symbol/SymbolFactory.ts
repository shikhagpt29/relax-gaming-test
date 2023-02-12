import {Constants} from "../utils/Constants";
import {Symbol} from "./Symbol";

export class SymbolFactory {
    public static instance: SymbolFactory;
    private static SYMBOL_POOL: Symbol[] = [];

    constructor() {
        if (SymbolFactory.instance) {
            debugger;
            throw new Error("Error: SymbolFactory.constructor() - Instantiation failed: Singleton.");
        }
    }

    public static createSymbolPool(): void {
        SymbolFactory.instance = new SymbolFactory();
        const spinSymOnReels = Constants.NUM_OF_SYMS + 3;
        const poolSyms: number = spinSymOnReels * Constants.REELS_NUM;
        for (let i = 0; i < poolSyms; i++) {
            SymbolFactory.freeSymbolToPool(SymbolFactory.createNewPoolSymbol());
        }
    }

    public static createNewPoolSymbol(): Symbol {
        return SymbolFactory.createSymbol();
    }

    static createSymbol(): Symbol {
        const symbolId: number = Math.floor(Math.random() * Constants.SYM_NAMES_MAP.length);
        return new Symbol(symbolId);
    }

    static getPoolSymbol(): Symbol {
        const randomSymId: number = Math.floor(Math.random() * this.SYMBOL_POOL.length);
        const [symbol] = SymbolFactory.SYMBOL_POOL.splice(randomSymId, 1);
        return symbol;
    }

    static freeSymbolToPool(removedSym: Symbol) {
        this.SYMBOL_POOL.push(removedSym);
    }
}
