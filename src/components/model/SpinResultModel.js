import { SYMBOLS } from "./Constants.js";

export default class SpinResultModel {
    constructor(display) {
        this.display = display;
        this.winLines = []

        this.parsePayLines();

        console.log("Result: ", this)
    }

    parsePayLines() {
        let lines = []
        for (let i = 0; i < 3; i++) {
            lines.push({
                line: i,
                symbols:[],
                positions:[]
            })
        }

        for (let i = 0; i < this.display.length; i++) {
            let reel = this.display[i]

            if (reel.length == 1) {
                lines[1].symbols.push(reel[0])
                lines[1].positions.push(i)
            }
            else {
                lines[0].symbols.push(reel[0])
                lines[0].positions.push(i)
                lines[2].symbols.push(reel[1])
                lines[2].positions.push(i)
            }
        }
        this.parseWinLines(lines)
    }

    parseWinLines(lines) {

        for (let i = 0; i < 3; i++) {
            if (this.checkWinLine(i, lines[i])) {
                this.winLines.push(lines[i])
            }
        }
    }

    checkWinLine(index, line) {
        if (line.symbols.length == 3 && this.areSymbolsEqual(line.symbols)) {
            let win = getFullLinePayOut(index, line.symbols[0])
            if (win > 0) {
                line.winPosition = line.positions;
                line.win = win;
                return true;
            }
        } else if (line.symbols.length >= 2) {
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("Cherry"), SYMBOLS.indexOf("7"), 75)) {
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("3xBAR"), SYMBOLS.indexOf("2xBAR"), 5)) {
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("3xBAR"), SYMBOLS.indexOf("BAR"), 5)) {
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("2xBAR"), SYMBOLS.indexOf("BAR"), 5)) {
                return true
            }
        }
        return false
    }

    areSymbolsEqual(symbols) {
        return symbols.every((symbol) => symbol == symbols[0])
    }

    checkCombinationWin(line, symbol1, symbol2, payout) {
        if (line.symbols.includes(symbol1) && line.symbols.includes(symbol2)) {
            line.winPosition = []
            line.winPosition.push(line.positions[line.symbols.indexOf(symbol1)])
            line.winPosition.push(line.positions[line.symbols.indexOf(symbol2)])
            line.win = payout
            return true
        }
        return false
    }

    getFullLinePayOut(lineIndex, symbolIndex) {
        switch(symbolIndex) {
            case SYMBOLS["Cherry"]:
                switch(lineIndex) {
                    case 0:
                        return 2000;
                    case 1:
                        return 1000;
                    case 2:
                        return 4000;
                }
                break;
            case SYMBOLS["7"]:
                return 170;
            case SYMBOLS["3XBAR"]:
                return 50;
            case SYMBOLS["2XBAR"]:
                return 20;
            case SYMBOLS["BAR"]:
                return 10;
        }
        return 0;
    }
}