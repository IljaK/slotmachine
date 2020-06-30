export default class Loader {
    constructor() {
        this.loader = PIXI.Loader.shared;

        this.loader.onProgress.add(this.onLoaderProgress.bind(this));
        this.loader.onComplete.add(this.onLoaderComplete.bind(this));

        this.onComplete = null;
    }

    loadAssets(onComplete) {
        this.onComplete = onComplete

        this.loader.add('2xBAR.png', 'assets/symbols/2xBAR.png')
        this.loader.add('3xBAR.png', 'assets/symbols/3xBAR.png')
        this.loader.add('BAR.png', 'assets/symbols/BAR.png')
        this.loader.add('7.png', 'assets/symbols/7.png')
        this.loader.add('Cherry.png', 'assets/symbols/Cherry.png')
        this.loader.add('reel-frame-bg.png', 'assets/reel-frame-bg.png')

        this.loader.add('play.png', 'assets/buttons/play.png')

        this.showLoader()
        this.loader.load()
    }

    onLoaderComplete(e) {
        this.hideLoader();
        if (this.onComplete) this.onComplete(null)
    }
    onLoaderProgress(e) {
        // TODO: Display progress
    }

    showLoader()
    {
        // TODO: 
    }

    hideLoader()
    {
        // TODO: 
    }
}