export default class Paylines extends PIXI.Container {

    constructor(model) {
        super();
        this.lines = []
        this.createLines();
        this.animateTween = null;

        // top y = 296
        // middle y = 386
        // bottom y = 478
    }

    createLines() {
        for (let i = 0; i < 2; i++) {
            let line = new PIXI.Graphics();
            line.beginFill(0xF67676)
            line.drawRect(0, -5, 666, 10)
            line.endFill();
            this.lines.push(line)
            this.addChild(line)

            line.alpha = 0;
            line.width = 0;

            //line.x = 50
            //line.y = 386
        }
    }

    animateLines(position) {

    }

    lineAnimation(line, position) {
        
    }

    stopAnimation() {

    }
}