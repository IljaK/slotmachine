import SlotSymbol from './SlotSymbol.js';

export default class SlotReel extends PIXI.Container {

    constructor(index, symbolsPerReel, reelStrip) {
        super();
        this.index = index;
        this.reelStrip = reelStrip;

        this.symbols = []

        for(let i = 0; i <= symbolsPerReel; i++) {
            let symbol = new SlotSymbol(reelStrip[i])
            this.symbols.push(symbol)
            this.addChild(symbol)
        }
    }

    repositionSymbols() {

    }
}