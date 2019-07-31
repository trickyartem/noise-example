import Noise from './noise_algorythm';
import Canvas from "./canvas";

export const canvas = new Canvas();
const noise = new Noise();

class Rectangles {
    private gray_scale: number;

    constructor(private x: number, private y: number, private scale: number, private xoff: number, private yoff: number) {
        this.gray_scale = 0;
    }

    public draw() {
        canvas.c.beginPath();
        canvas.c.fillStyle = `rgba(0, 0, 0, ${this.gray_scale})`;
        canvas.c.rect(this.x, this.y , this.scale, this.scale);
        canvas.c.fill();
        canvas.c.closePath();
    }

    public change_color() {
        this.xoff += 0.01;
        this.yoff += 0.01;
        this.gray_scale = noise.noise(this.xoff, this.yoff);

        this.draw();
    }
}

export default Rectangles;
