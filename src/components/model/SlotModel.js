export default class SlotModel {

    reelsAmount = 3;
    reelWidth = 141;
    reelGap = 90;

    symbolHeight = 141;
    symbolGap = 30;
    symbolsPerReel = 3;

    reelStrip = [
        [4, 3, 1, 0, 2],
        [4, 3, 1, 0, 2],
        [4, 3, 1, 0, 2]
    ]

    
    initialDisplay = [
        [3, 1],
        [4],
        [1, 0]
    ];

    constructor() {

    }

    get slotMachineWidth() {
        return ((this.reelsAmount - 1) * this.reelGap) + (this.reelsAmount * this.reelWidth);
    }

    getReelStopPosition(reelStrip, reel) {

        for (let i = 0; i < reelStrip.length; i++) {

            for (let n = 0; n < reel.length; n++) {

                let index = i + n
                if (index >= reelStrip.length) index -= reelStrip.length;

                if (reel[n] != reelStrip[index]) {
                    break
                }
                if ((n + 1) === reel.length) {
                    return i;
                }
            }
        }
        return -1
    }

    getStopPositions(reelStrips, display) {
        if (!reelStrips || !display || display.length == 0) return [];

        let stops = []

        reelStrips.forEach((reelStrip, reelIndex) => {
            stops.push(this.getReelStopPosition(reelStrip, display[reelIndex]));
        });

        return stops;
    }

    getDisplayByStops(stops, displaySize, reelStrip) {
        let display = null
        if (reelStrip) {
            display = []

            reelStrip.forEach((strip, index) => {

                let extendedstrip = strip.slice(0).concat(strip.slice(0, displaySize[index]))
                let position = 0;
                if (stops && stops.length >= index) {
                    position = stops[index];
                }
                display.push(extendedstrip.slice(position, position + displaySize[index]))
            })

        }
        return display;
    }

    getSymbolsByPosition(position, length, strip) {
        let symbols = null

        if (strip) {
            let extendedStrip = strip.slice(0).concat(strip.slice(0, length))
            symbols = extendedStrip.slice(position, position + length)
        }

        return symbols
    }

    generateRandomDisplay() {
        let display = []
        for (let i = 0; i < this.reelsAmount; i++) {
            display.push(this.generateRandomReel(i))
        }
        return display;
    }

    generateRandomReel(index) {
        let pos = this.randomInt(0, this.reelStrip[index].length)
        let length = this.randomInt(1,2)
        return this.getSymbolsByPosition(pos, length, this.reelStrip[index])
    }

    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}