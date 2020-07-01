import { PAYTABLE } from '../model/Constants.js';
import PayTableCombination from './PayTableCombination.js';


export default class PayTable extends PIXI.Container {
    constructor() {
        super()

        this.payOuts = []
        this.animatedPayouts = []

        PAYTABLE.forEach((data, index) => {
            this.createTableLine(data, index);
        });

        this.x = 440
        this.y = 10
    }

    createTableLine(data, index) {
        let tableLine = new PayTableCombination(data[0], data[1], data[2], index)
        this.addChild(tableLine)
        this.payOuts.push(tableLine)

        tableLine.y = index * 50;
    }

    animateLines(winlines) {
        this.animateTween = gsap.timeline({repeat:-1});

        winlines.forEach(winline => {
            let payOut = this.getPayoutField(winline.id)
            this.animateTween.to(payOut.frame, 0.5, { alpha: 1})
            this.animateTween.to(payOut.frame, 0.5, { alpha: 0})

            if (!this.animatedPayouts.includes(payOut)) {
                this.animatedPayouts.push(payOut)
            }
        });
    }

    stopAnimation() {
        if (this.animateTween) {
            this.animateTween.kill()
            this.animateTween = null;
        }
        this.animatedPayouts.forEach(payout => {
            payout.frame.alpha = 0
        });
        this.animatedPayouts = []
    }

    getPayoutField(id)
    {
        for(let i = 0; i < this.payOuts.length; i++) {
            if (this.payOuts[i].id === id) {
                return this.payOuts[i]
            }
        }
        return null;
    }
}