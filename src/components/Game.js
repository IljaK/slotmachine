import SlotMachine from './slot/SlotMachine.js'
import SlotModel from './model/SlotModel.js'

export default class Game extends PIXI.Container {

    constructor() {
        super();

        this.slotMachine = new SlotMachine(new SlotModel())
        this.addChild(this.slotMachine)
    }
}