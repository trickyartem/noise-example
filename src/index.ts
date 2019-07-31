import Rectangles from "./Rectangles";
import { canvas } from "./Rectangles";

let rectangles: Array<Rectangles> = [];

addEventListener('resize', () => {
    canvas.c.canvas.width = innerWidth;
    canvas.c.canvas.height = innerHeight;

    init();
});

function init() {
    rectangles = [];

    let scale = 10;

    let yoff = 0;
    for (let i = 0; i < canvas.c.canvas.width / scale; i++) {
        let xoff = 0;
        let x = scale * i;
        for (let j = 0; j < canvas.c.canvas.height / scale; j++) {
            let y = scale * j;
            xoff += 0.05;

            rectangles.push(new Rectangles(x, y, scale, xoff, yoff));
        }
        yoff += 0.05;
    }
}

function animate() {
    canvas.c.clearRect(0, 0, canvas.c.canvas.width, canvas.c.canvas.height);

    for(const rect of rectangles) {
        rect.change_color();
    }

    requestAnimationFrame(animate);
}

init();
animate();
