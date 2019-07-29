import Noise from './noise_algorythm';
import Canvas from "./canvas";

const canvas = new Canvas();
canvas.append();
interface off {
    x: number;
    y: number;
}

class Rectangels {
    private gray_scale: number = 111;
    private off: off;
    private readonly noise = new Noise();

    constructor(private x: number, private y: number, private scale: number, private color: number) {
        this.off = { x: 0, y: 0 };
    }

    private draw() {
        canvas.c.fillStyle = `rgba(${this.gray_scale}, ${this.gray_scale}, ${this.gray_scale}, 1.0)`;
        canvas.c.strokeStyle = 'white';
        canvas.c.rect(this.x, this.y , this.scale, this.scale);
        canvas.c.fill();
        canvas.c.stroke();
    }

    public change_color() {
        this.off.x += this.color;
        this.off.y += this.color + 1;
        this.gray_scale = this.noise.noise(this.off.x, this.off.y) * 225;

        this.draw();
    }
}

export default Rectangels;
