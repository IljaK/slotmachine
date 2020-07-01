import SlotReel from './SlotReel.js';

export default class SlotMachine extends PIXI.Container {

    constructor(model) {
        super();

        this.spinTimeStamp = 0;
        this._isSpinning = false;
        this.readyStop = false;
        this.slotModel = model;
        this.reels = []
        this.createFrame();

        this.x = 220
        this.y = 180
        this.scale.set(0.6, 0.6)

        for (let i = 0; i < model.reelsAmount; i++) {
            this.createReel(i);
        }
    }

    get isSpinning() {
        return this._isSpinning;
    }

    createMask() {
        let mask = new PIXI.Graphics();
        mask.beginFill(0xFFFFFF)
        mask.drawRect(-330, -162, 660, 332)
        mask.endFill()

        this.reelsContainer.addChild(mask);
        this.reelsContainer.mask = mask;
    }

    createFrame()
    {
        this.bg = new PIXI.Sprite(PIXI.loader.resources['reel-frame-bg.png'].texture)
        this.addChild(this.bg)
        this.bg.anchor.set(0.5, 0.5);
    }

    createReel(index) {

        this.reelsContainer = new PIXI.Container()
        this.addChild(this.reelsContainer);

        this.createMask();

        let reel = new SlotReel(index, this.slotModel);
        this.reels.push(reel);
        this.reelsContainer.addChild(reel);

        reel.x = (this.slotModel.reelWidth + this.slotModel.reelGap) * index - this.slotModel.slotMachineWidth / 2 + this.slotModel.reelWidth / 2

        console.log("Reel " + index + " x: " + reel.x)

    }

    set display(value) {
        this.reels.forEach(reel => {
            reel.display = value
        });
    }

    get display() {
        let array = []
        this.reels.forEach(reel => {
            array.push(reel.display)
        });
        return array;
    }

    startSpin()
    {
        if (this._isSpinning) {
            return;
        }

        this.resultDisplay = null;
        this._isSpinning = true;
        this.readyStop = false;

        let tween = gsap.timeline();

        this.reels.forEach((reel, index) => {
            tween.add(() => reel.startSpin(), index * 0.3)
        });

        tween.add(() => this.allowStop(), 2.0)
    }

    allowStop()
    {
        this.readyStop = true;
        if (this.resultDisplay) {
            this.stopSpin(this.resultDisplay, this.spinCompleteCallback)
        }
    }

    stopSpin(display, completeCallback)
    {
        this.spinCompleteCallback = completeCallback

        if (!this.readyStop) {
            this.resultDisplay = display;
            return;
        }
        this.resultDisplay = null;

        let tween = gsap.timeline({onComplete: this.onSpinCompleted.bind(this)});

        this.reels.forEach((reel, index) => {
            tween.add(reel.stopSpin(display[index]), index * 0.5)
        });
    }

    onSpinCompleted()
    {
        this._isSpinning = false;
        if (this.spinCompleteCallback) {
            this.spinCompleteCallback()
        }
    }

    getSymbol(reel, index) {
        return this.reels[reel].getSymbol(index)
    }
}