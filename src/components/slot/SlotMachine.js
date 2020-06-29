import SlotReel from './SlotReel.js';

export default class SlotMachine extends PIXI.Container {

    constructor(model) {
        super();

        this.slotModel = model;
        this.reels = []
        //this.bg = new PIXI.Sprite(PIXI.utils.TextureCache['reel-frame-bg.png'].texture)
        this.bg = new PIXI.Sprite(PIXI.loader.resources['reel-frame-bg.png'].texture)
        this.addChild(this.bg)

        for (let i = 0; i < model.reelsAmount; i++) {
            this.createReel(i);
        }
    }

    createReel(index) {
        let reel = new SlotReel(index, this.slotModel.reelStrip[index]);

        reel.x = (this.slotModel.reelWidth * index - this.slotModel.slotMachineWidth) / 2
        if (index > 0) {
            reel.x += this.slotModel.reelGap;
        }

        this.reels.push(reel);
        this.addChild(reel);
    }

    startSpin()
    {

    }

    stopSpin(display)
    {

    }
}