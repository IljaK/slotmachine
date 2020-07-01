import { PAYTABLE } from '../model/Constants.js';
import PayTableCombination from './PayTableCombination.js';


export default class PayTable extends PIXI.Container {
    constructor() {
        super()

        PAYTABLE.forEach((data, index) => {
            this.createTableLine(data, index);
        });

        this.x = 440
    }

    createTableLine(data, index) {
        let tableLine = new PayTableCombination(data[0], data[1], data[2])
        this.addChild(tableLine)

        tableLine.y = index * 50;
    }
}