
export default class SpriteButton extends PIXI.Sprite {

    constructor(texture, clickCallback) {
        super(PIXI.loader.resources[texture].texture);

        this.buttonMode = true;
        this.interactive = true;
        this.anchor.set(0.5);
        this.clickCallback = clickCallback

        this.isDown = false;
        this.isOver = false;

        this.on('pointerdown', this.onButtonDown)
        this.on('pointerup', this.onButtonUp)
        this.on('pointerupoutside', this.onButtonUp)
        this.on('pointerover', this.onButtonOver)
        this.on('pointerout', this.onButtonOut);
    }
    onClick() {

    }

    onButtonDown() {
        this.isDown = true;
        this.alpha = 1;
    }
    
    onButtonUp() {
        this.isDown = false;
        if (this.isOver) {
            if (this.clickCallback) this.clickCallback()
        }
    }
    
    onButtonOver() {
        this.isOver = true;
        if (this.isDown) {
            return;
        }
    }
    
    onButtonOut() {
        this.isOver = false;
        if (this.isDown) {
            return;
        }
    }
}