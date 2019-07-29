class Canvas {
    public readonly canvas = document.createElement('canvas');
    public readonly c: CanvasRenderingContext2D;

    constructor() {
        this.c = this.canvas.getContext('2d');
    }

    public append() {
        this.canvas.height = innerHeight;
        this.canvas.width = innerWidth;

        this.canvas.style.position = "fixed";
        this.canvas.style.top = "0px";
        this.canvas.style.left = "0px";
        document.body.appendChild(this.canvas);
    }
}

export default Canvas;
