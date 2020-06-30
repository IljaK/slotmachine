import SlotMachine from './slot/SlotMachine.js'
import SlotModel from './model/SlotModel.js'
import SpriteButton from './button/SpriteButton.js';

export default class Game extends PIXI.Container {

    constructor() {
        super();

        this.slotModel = new SlotModel()

        this.slotMachine = new SlotMachine(this.slotModel)
        this.addChild(this.slotMachine)

        this.spinButton = new SpriteButton("play.png", this.onPlayClick.bind(this));
        this.spinButton.x = 600
        this.spinButton.y = 650
        this.spinButton.scale.set(0.5, 0.5)
        this.addChild(this.spinButton)
    }

    onPlayClick()
    {
        this.spinButton.isEnabled = false;
        let display = this.slotModel.generateRandomDisplay()
        this.slotMachine.startSpin()
        this.slotMachine.stopSpin(display, this.onSpinComplete.bind(this))
    }

    onSpinStart()
    {

    }

    onSpinComplete()
    {
        this.spinButton.isEnabled = true;
    }
}