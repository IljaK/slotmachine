import SlotMachine from './slot/SlotMachine.js'
import SlotModel from './model/SlotModel.js'
import SpriteButton from './ui/SpriteButton.js';
import Paylines from './slot/Paylines.js'
import SpinResultModel from './model/SpinResultModel.js'
import TopPanel from './ui/TopPanel.js';
import PayTable from './slot/PayTable.js';

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

        this.payLines = new Paylines(this.slotMachine)
        this.addChild(this.payLines)

        this.topPanel = new TopPanel();
        this.addChild(this.topPanel)

        this.payTable = new PayTable();
        this.addChild(this.payTable)
    }

    onPlayClick() {

        if (this.topPanel.balance < 1) return

        this.topPanel.balance -= 1

        this.payLines.stopAnimation()
        this.spinButton.isEnabled = false;
        this.spinResult = new SpinResultModel(this.slotModel.generateRandomDisplay())
        //this.spinResult = new SpinResultModel([[2],[4],[1]])
        this.slotMachine.startSpin()
        this.slotMachine.stopSpin(this.spinResult.display, this.onSpinComplete.bind(this))
    }

    onSpinComplete() {
        this.spinButton.isEnabled = true;
        this.spinResult.display.forEach((reel, index) => {
            console.log(index + " reel 0 symbol: " + reel[0] + " == slot 0 symbol: " + this.slotMachine.getSymbol(index, 0).id)
        });
        this.payLines.animateLines(this.spinResult.winLines)
    }
}