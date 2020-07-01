export default class Forcer extends PIXI.Container {
    constructor() {
        super();
        this.createLabels()

        this.y = 300
    }

    createLabels()
    {
        this.forcerLabel = new PIXI.Text('FORCER:', { fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
        this.addChild(this.forcerLabel)

        this.forcerLabel.x = 20
        this.forcerLabel.y = 10

        this.forcerInput = new PIXI.TextInput({
            input: {
                fontSize: '25px',
                padding: '8px',
                width: '100px',
                color: '#26272E',
                fontFamily : 'Arial',
            }, 
            box: {fill: 0xEEEEEE}
        })
        this.forcerInput.x = 150
        this.forcerInput.y = 2

        this.addChild(this.forcerInput)

        this.forcerInput.text = ""
        this.forcerInput.restrict = "0123456789"
        this.forcerInput.maxLength = 6

        let description = "Forcer description:\n" +
        "Use symbol id and position id for forcing special results.\n\n" +
        "0 - BAR               0 - TOP\n" +
        "1 - 2xBAR           1 - CENTER\n" +
        "2 - 3xBAR           2 - BOTTOM\n" +
        "3 - 7\n" +
        "4 - Cherry\n\n" +
        "Example: 302110";


        this.descriptionLabel = new PIXI.Text(description, { fontFamily : 'Arial', fontSize: 16, fill : 0xff1010, align : 'left', width: 300, height: 300});
        this.addChild(this.descriptionLabel)
        this.descriptionLabel.x = 20
        this.descriptionLabel.y = 80
    }

    get forcerValue() {
        if (this.forcerInput.text.length != 6) {
            return "";
        }
        return this.forcerInput.text
    }
}