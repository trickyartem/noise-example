import Noise from './noise_algorythm';
import Canvas from "./canvas";

export const canvas = new Canvas();
const noise = new Noise();

interface Point {
    x: number;
    y: number;
}

class Rectangles {
    private gray_scale: number;

    constructor(private x: number, private y: number, private scale: number, private xoff: number, private yoff: number, private  zoff: number) {
        this.gray_scale = 0;
    }

    public draw(last_pos: Point) {
        canvas.c.beginPath();
        canvas.c.strokeStyle = `rgba(0, 0, 0, ${this.gray_scale})`;
        // canvas.c.rect(this.x, this.y , this.scale, this.scale);
        // canvas.c.moveTo(last_pos.x, last_pos.y);
        // canvas.c.lineTo(this.x, this.y);
        canvas.c.arc(last_pos.x, last_pos.y, 3, 0, 360, false);
        canvas.c.stroke();
        canvas.c.closePath();
    }

    public change_color() {
        this.xoff += 0.01;
        this.yoff += 0.01;
        this.zoff += 0.01;

        let last_pos = { x: 0, y: 0 };

        this.gray_scale = noise.noise(this.xoff, this.yoff, this.zoff);

        last_pos.x = this.x + Math.cos(this.gray_scale) * 80;
        last_pos.y = this.y + Math.sin(this.gray_scale) * 80;

        this.draw(last_pos);
    }
}

export default Rectangles;
