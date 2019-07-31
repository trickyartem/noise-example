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

    let zoff = 0;
    let yoff = 0;
    for (let i = 0; i < 50; i++) {
        let xoff = 0;
        let x = scale * i;
        for (let j = 0; j < 50; j++) {
            let y = scale * j;
            xoff += 0.1;

            rectangles.push(new Rectangles(x, y, scale, xoff, yoff, zoff));
        }
        yoff += 0.1;

        zoff += 0.1
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
