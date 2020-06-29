export default class SlotModel  {

    reelsAmount = 3;
    reelWidth = 141;
    reelGap = 90;

    symbolHeight = 141;
    symboStep = 70;
    symbolsPerReel = 3;

    reelStrip = [
        [2, 0, 1, 3, 4],
        [4, 2, 0, 1, 3],
        [1, 3, 4, 2, 0]
    ]

    constructor() {

    }

    get slotMachineWidth() {
        return ((this.reelsAmount - 1) * this.reelGap) + (this.reelsAmount * this.reelWidth);
    }

    
}