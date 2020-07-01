
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

        this.alpha = 0.8;
    }
    onClick() {

    }

    onButtonDown() {
        this.isDown = true;
        this.alpha = 1;
    }
    
    onButtonUp() {
        this.isDown = false;
        this.alpha = 0.8;
        if (this.isOver || PIXI.utils.isMobile) {
            if (this.clickCallback) this.clickCallback()
        }
    }
    
    onButtonOver() {
        this.isOver = true;
        this.alpha = 1;
        if (this.isDown) {
            return;
        }
    }
    
    onButtonOut() {
        this.alpha = 0.8;
        this.isOver = false;
        if (this.isDown) {
            return;
        }
    }

    get isEnabled() {
        return this.interactive
    }
    
    set isEnabled(value) {
        this.interactive = value;
        if (!value) {
            this.alpha = 0.5;
            this.isOver = false;
            this.isDown = false;
        } else {
            this.alpha = 0.8;
        }
    }
}