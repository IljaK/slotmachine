import { SYMBOLS } from '../model/Constants.js';

export default class SlotSymbol extends PIXI.Container {

    constructor(id) {
        super();

        this.icon = new PIXI.Sprite()
        this.addChild(this.icon)
        this.icon.anchor.set(0.5, 0);

        this.id = id;
    }

    get id(){
        return this._id;
    }
    set id(value) {
        if (this._id != value) {
            this._id = value;
            this.icon.texture = this.getTexture(value);
        }
    }

    getTexture(id) {
        return PIXI.loader.resources[SYMBOLS[id] + '.png'].texture
    }
}