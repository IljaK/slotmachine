export default class TopPanel extends PIXI.Container {
    constructor() {
        super();
        this.createBalance();

    }

    createBalance() 
    {
        this.balanceLabel = new PIXI.Text('BALANCE:', { fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        this.addChild(this.balanceLabel)

        this.balanceLabel.x = 20
        this.balanceLabel.y = 10

        this.balanceInput = new PIXI.TextInput({
            input: {
                fontSize: '25px',
                padding: '8px',
                width: '100px',
                color: '#26272E',
                fontFamily : 'Arial',
            }, 
            box: {fill: 0xEEEEEE}
        })
        this.balanceInput.x = 160
        this.balanceInput.y = 2

        this.addChild(this.balanceInput)

        this.balanceInput.text = "1000"
        this.balanceInput.restrict = "0123456789"
        this.balanceInput.maxLength = 6
    }

    get balance() {
        return parseInt(this.balanceInput.text)
    }

    set balance(value) {
        this.balanceInput.text = value
    }
}