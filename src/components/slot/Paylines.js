export default class Paylines extends PIXI.Container {

    constructor(slotMachine) {
        super();

        this.slotMachine = slotMachine
        this.slotModel = slotMachine.slotModel

        this.animateTween = null;
        this.animatedContent = []

        this.x = this.slotMachine.x
        this.y = this.slotMachine.y
        this.scale = this.slotMachine.scale;
    }

    createLine(index) {
        let line = new PIXI.Graphics();
        line.beginFill(0xF67676)
        line.drawRect(-333, -5, 666, 10)
        line.endFill();
        this.addChild(line)

        //line.alpha = 0;
        line.width = 666;

        switch(index) {
            case 0:
                line.y = -90;
                break;
            case 1:
                line.y = 2;
                break;
            case 2:
                line.y = 94;
                break;
        }

        return line
    }

    createSquare(symbol, container)
    {
        let square = new PIXI.Graphics()
        square.beginFill(0xF67676, 0)
        square.lineStyle(8, 0xff0000)
        square.drawRoundedRect(-80, -10, 161, 141, 16)

        container.addChild(square)

        //let symbol = this.slotMachine.getSymbol(0,0);
        let globalPos = symbol.getGlobalPosition();
        let localPos = container.toLocal(globalPos)

        square.x = localPos.x
        square.y = localPos.y

        return square;
    }

    createPayLine(winline) {
        let container = new PIXI.Container();
        this.addChild(container)

        let line = this.createLine(winline.line)
        container.addChild(line)

        winline.winPosition.forEach((reel, index ) => {
            let symbolIndex = 0;
            if (winline.line === 2) {
                symbolIndex = 1;
            }
            let symbol = this.slotMachine.getSymbol(reel, symbolIndex)
            this.createSquare(symbol, container);
        });

        container.alpha = 0;

        this.animatedContent.push(container);

        return container
    }

    animateLines(winlines) {

        this.stopAnimation();

        if (winlines.length === 0) {
            return;
        }

        this.animateTween = gsap.timeline({repeat:-1});

        winlines.forEach(winline => {
            let payLine = this.createPayLine(winline)
            this.animateTween.to(payLine, 0.5, { alpha: 1})
            this.animateTween.to(payLine, 0.5, { alpha: 0})
        });
    }

    stopAnimation() {
        if (this.animateTween) {
            this.animateTween.kill()
            this.animateTween = null;
        }

        this.animatedContent.forEach(container => {
            container.destroy(true);
        });
        this.animatedContent = []
    }
}