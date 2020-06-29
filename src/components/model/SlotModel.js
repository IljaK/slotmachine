export default class SlotModel  {

    reelAmount = 3;
    reelWidth = 141
    reelGap = 4;

    symbolHeight = 141
    symboStep = 70

    reelStrip = [
        [2, 0, 1, 3, 4],
        [4, 2, 0, 1, 3],
        [1, 3, 4, 2, 0]
    ]

    constructor() {

    }

    get slotMachineWidth() {
        return reelAmount * (reelWidth + reelGap) - reelGap;
    }

    
}