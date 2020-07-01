import { SYMBOLS } from '../model/Constants.js'

export default class PayTableCombination extends PIXI.Container {
    constructor(symbols, payOut, text) {
        super()

        this.symbols = symbols
        this.payOut = payOut

        this.createIcons()
        this.createPayoutField(payOut)
        this.createTextField(text)
    }

    createIcons() {
        let shift = 0
        if (this.symbols.length < 3) {
            shift = 1
        }

        this.symbols.forEach((id, index) => {
            let symbol = new PIXI.Sprite(this.getTexture(id))
            this.addChild(symbol)
            symbol.scale.set(0.3, 0.3)
            symbol.x = (index + shift) * 40
        });
    }

    createPayoutField(payOut) {
        this.payOutLabel = new PIXI.Text(payOut, { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
        this.addChild(this.payOutLabel)

        this.payOutLabel.x = 130
        this.payOutLabel.y = 10
    }

    createTextField(text) {
        this.textLabel = new PIXI.Text(text, { fontFamily: 'Arial', fontSize: 12, fill: 0xff1010, align: 'center' });
        this.addChild(this.textLabel)

        this.textLabel.x = 150
        this.textLabel.y = 10
    }

    getTexture(id) {
        return PIXI.loader.resources[SYMBOLS[id] + '.png'].texture
    }
}