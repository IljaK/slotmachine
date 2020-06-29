import SlotReel from './SlotReel.js';

export default class SlotMachine extends PIXI.Container {

    constructor(model) {
        super();

        this.slotModel = model;
        this.reels = []
        this.createFrame();

        this.x = 384
        this.y = 384

        for (let i = 0; i < model.reelsAmount; i++) {
            this.createReel(i);
        }
    }

    createFrame()
    {
        this.bg = new PIXI.Sprite(PIXI.loader.resources['reel-frame-bg.png'].texture)
        this.addChild(this.bg)
        this.bg.anchor.set(0.5, 0.5);
    }

    createReel(index) {
        let reel = new SlotReel(index, this.slotModel.symbolsPerReel, this.slotModel.reelStrip[index]);
        this.reels.push(reel);
        this.addChild(reel);

        reel.x = (this.slotModel.reelWidth + this.slotModel.reelGap) * index - this.slotModel.slotMachineWidth / 2

        console.log("Reel " + index + " x: " + reel.x)

    }

    startSpin()
    {

    }

    stopSpin(display)
    {

    }
}