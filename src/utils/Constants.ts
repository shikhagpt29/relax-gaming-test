/**
 * Created by shikha on 2023-02-06.
 */
export class Constants {
    public static REELS_NUM: number = 3;
    public static NUM_OF_SYMS: number = 3;
    public static SYMBOL_WIDTH: number = 100;
    public static SYMBOL_HEIGHT: number = 100;
    public static SPIN_SPEED: number = 0.05;
    public static SPIN_TIME: number = 2.8;
    public static GAME_WIDTH: number = 1280;
    public static GAME_HEIGHT: number = 768;
    public static Currency: string = "$";
    public static SYM_NAMES_MAP: string[] = ["spade", "club", "heart", "diamond"];
    public static DEFAULT_REELS: number[][] = [[0, 2, 3], [1, 3, 3], [2, 3, 1]];
}
