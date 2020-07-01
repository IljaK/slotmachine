import { SYMBOLS } from "./Constants.js";

export default class SpinResultModel {
    constructor(display) {
        this.display = display;
        this.winLines = []
        this.totalWin = 0;

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
                this.totalWin += lines[i].win
            }
        }
    }

    checkWinLine(index, line) {
        if (line.symbols.length == 3 && this.areSymbolsEqual(line.symbols)) {
            this.fillFullLinePayOut(line, index, line.symbols[0])
            line.winPosition = line.positions;
            return true;
        } else if (line.symbols.length >= 2) {
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("Cherry"), SYMBOLS.indexOf("7"), 75)) {
                line.id = 4;
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("3xBAR"), SYMBOLS.indexOf("2xBAR"), 5)) {
                line.id = 8;
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("3xBAR"), SYMBOLS.indexOf("BAR"), 5)) {
                line.id = 9;
                return true
            }
            if (this.checkCombinationWin(line, SYMBOLS.indexOf("2xBAR"), SYMBOLS.indexOf("BAR"), 5)) {
                line.id = 10;
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

    fillFullLinePayOut(line, lineIndex, symbolIndex) {
        switch(symbolIndex) {
            case SYMBOLS.indexOf("Cherry"):
                switch(lineIndex) {
                    case 0:
                        line.win = 2000;
                        line.id = 0;
                        break
                    case 1:
                        line.win = 1000;
                        line.id = 1;
                        break
                    case 2:
                        line.win = 4000;
                        line.id = 2;
                        break
                }
                break;
            case SYMBOLS.indexOf("7"):
                line.win = 170;
                line.id = 3;
                break
            case SYMBOLS.indexOf("3XBAR"):
                line.win = 50;
                line.id = 5;
                break
            case SYMBOLS.indexOf("2XBAR"):
                line.win = 20;
                line.id = 6;
                break
            case SYMBOLS.indexOf("BAR"):
                line.win = 10;
                line.id = 7;
                break
        }
    }
}