import SlotSymbol from './SlotSymbol.js';

export default class SlotReel extends PIXI.Container {

    constructor(index, slotModel) {
        super();

        this.initialOffset = -150
        this.middleOffset = 90

        this.offset = this.initialOffset

        this.index = index;
        this.slotModel = slotModel;
        this.spinLoopTween = null;

        this.windupDuration = 0.2;
        this.windupOffset = 50;

        this.accelerationDuration = 0.3;
        this.accelerationOffset = 50;

        this.spinSpeed = 3;
        this.stopDuration = 0.1;

        this.overShootDistance = 10
        this.overShootDuration = 0.1

        this.symbols = []

        for(let i = 0; i <= this.slotModel.symbolsPerReel; i++) {
            let symbol = new SlotSymbol(this.reelStrip[i])
            this.symbols.push(symbol)
            this.addChild(symbol)
        }

        this.reelLayout = this.slotModel.initialDisplay[this.index]
    }

    get reelStrip() {
        return this.slotModel.reelStrip[this.index]
    }

    get slotHeight() {
        return this.slotModel.symbolHeight + this.slotModel.symbolGap;
    }

    set reelLayout(value) {
        this.stripPosition = this.slotModel.getReelStopPosition(this.reelStrip, value) - 1;
        this.stripPosition = this.clampStripPosition(this.stripPosition);
        this.offset = this.initialOffset;

        if (value.length == 1) {
            this.offset += this.middleOffset;
        }
        this.placeSymbols();
    }

    repositionSymbols() {
        this.clampOffset();
        this.stripPosition = this.clampStripPosition(this.stripPosition);
        this.placeSymbols();
    }

    placeSymbols()
    {
        let symbolsOrder = this.slotModel.getSymbolsByPosition(this.stripPosition, this.symbols.length, this.reelStrip)
        symbolsOrder = symbolsOrder.reverse();

        let slotHeight = this.slotHeight;
        for(let i = 0; i < this.symbols.length; i++) {
            let symbol = this.symbols[i]
            symbol.y = (i - 1) * slotHeight + this.offset;
            symbol.id = symbolsOrder[i]
        }
    }

    clampOffset()
    {
        let slotHeight = this.slotHeight;
        if (this.offset > 0) {
            this.stripPosition += Math.floor(this.offset / slotHeight) + 1
            this.offset = this.offset % slotHeight - slotHeight
        } else {
            this.stripPosition += Math.ceil(this.offset / slotHeight)
            this.offset = this.offset % slotHeight
        }
    }

    clampStripPosition(stripPosition)
    {
        stripPosition = Math.floor(stripPosition % (this.reelStrip.length))
        if (stripPosition < 0) stripPosition += (this.reelStrip.length)
        return stripPosition
    }

    startSpin()
    {
        let tween = gsap.timeline({ onComplete: this.launchSpinTween.bind(this) });
        tween.add(this.windupTween())
        tween.add(this.accelationTween())
        return tween;
    }

    stopSpin(display = [0,2])
    {
        this.display = display

        let resultStop = this.slotModel.getReelStopPosition(this.reelStrip, display)

        let slotHeight = this.slotHeight;
        let remainOffset = slotHeight + this.initialOffset - this.offset;

        if (display.length == 1) {
            remainOffset += slotHeight * 2 + this.middleOffset;
        } else {
            remainOffset += slotHeight * 3;
        }
        remainOffset += this.overShootDistance

        resultStop = this.clampStripPosition(resultStop)
        this.stripPosition = resultStop

        this._tweeningOffset = 0

        let tween = gsap.timeline({ onComplete: this.onReelStopped.bind(this) });
        tween.add(() => this.stopSpinTween());
        tween.to(this, this.stopDuration, {tweeningOffset: remainOffset, ease: "none"})
        tween.to(this, this.overShootDuration, {tweeningOffset: remainOffset - this.overShootDistance, ease: "sine.inOut"})

        return tween
    }

    onReelStopped()
    {
        console.log("On reel " + this.index + " stopped: " + this.display)
    }

    stopSpinTween()
    {
        if (this.spinLoopTween) {
            this.spinLoopTween.kill();
            this.spinLoopTween = null;
        }
    }

    get tweeningOffset()
    {
        return this._tweeningOffset
    }

    set tweeningOffset(value)
    {
        let delta = value - this._tweeningOffset;
        this._tweeningOffset = value;
        this.offset += delta;
        this.repositionSymbols();
    }

    windupTween()
    {
        this._tweeningOffset = 0;
        return gsap.to(this, this.windupDuration, {tweeningOffset: -this.windupOffset, ease: "sine.inOut"})
    }

    accelationTween()
    {
        this._tweeningOffset = 0;
        return gsap.to(this, this.accelerationDuration, {tweeningOffset: this.accelerationOffset, ease: "power2.in"})
    }

    launchSpinTween()
    {
        this.stopSpinTween()
        this._tweeningOffset = 0;
        let stripSize = this.slotHeight * (this.reelStrip.length);

        this.spinLoopTween = gsap.to(this, 1 / this.spinSpeed, {tweeningOffset: stripSize, ease: "none", repeat: -1})

    }
}