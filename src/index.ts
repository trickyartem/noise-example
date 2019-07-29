import Rectangels from "./rectangels";

let rectangles: Array<Rectangels> = [];

function init() {
    for (let i = 0; i < 5; i++) {
        let scale = 40;
        let x = scale * i;

        for (let j = 0; j < 5; j++) {
            let y = scale * j;
            let color = Math.random() * 11 + 1;

            rectangles.push(new Rectangels(x, y, scale, color));
            console.log(new Rectangels(x, y, scale, color));
        }
    }
}

function animate() {
    for(const rect of rectangles) {
        rect.change_color();
    }

    requestAnimationFrame(animate);
}

init();
animate();
