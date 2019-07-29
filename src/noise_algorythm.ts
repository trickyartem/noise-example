class Noise {
    private readonly PERLIN_YWRAPB: number = 4;
    private readonly PERLIN_YWRAP: number = 1 << this.PERLIN_YWRAPB;
    private readonly PERLIN_ZWRAPB: number = 8;
    private readonly PERLIN_ZWRAP: number = 1 << this.PERLIN_ZWRAPB;
    private readonly PERLIN_SIZE: number = 4095;
    private readonly perlin: Array<number>;
    private perlin_octaves: number = 4;
    private perlin_amp_falloff: number = 0.5;

    private scaled_cosine = (i: number) => 0.5 * (1.0 - Math.cos(i * Math.PI));

    constructor() {
        this.perlin = new Array(this.PERLIN_SIZE + 1);
        for (let i = 0; i < this.PERLIN_SIZE + 1; i++) {
            this.perlin[i] = Math.random();
        }
    }

    public noise = (x: number, y = 0, z = 0) => {


        if (x < 0) {
            x = -x;
        }
        if (y < 0) {
            y = -y;
        }
        if (z < 0) {
            z = -z;
        }

        let xi = Math.floor(x),
            yi = Math.floor(y),
            zi = Math.floor(z);
        let xf = x - xi;
        let yf = y - yi;
        let zf = z - zi;
        let rxf, ryf;

        let r = 0;
        let ampl = 0.5;

        let n1, n2, n3;

        for (let o = 0; o < this.perlin_octaves; o++) {
            let of = xi + (yi << this.PERLIN_YWRAPB) + (zi << this.PERLIN_ZWRAPB);

            rxf = this.scaled_cosine(xf);
            ryf = this.scaled_cosine(yf);

            n1 = this.perlin[of & this.PERLIN_SIZE];
            n1 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n1);
            n2 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
            n2 += rxf * (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n2);
            n1 += ryf * (n2 - n1);

            of += this.PERLIN_ZWRAP;
            n2 = this.perlin[of & this.PERLIN_SIZE];
            n2 += rxf * (this.perlin[(of + 1) & this.PERLIN_SIZE] - n2);
            n3 = this.perlin[(of + this.PERLIN_YWRAP) & this.PERLIN_SIZE];
            n3 += rxf * (this.perlin[(of + this.PERLIN_YWRAP + 1) & this.PERLIN_SIZE] - n3);
            n2 += ryf * (n3 - n2);

            n1 += this.scaled_cosine(zf) * (n2 - n1);

            r += n1 * ampl;
            ampl *= this.perlin_amp_falloff;
            xi <<= 1;
            xf *= 2;
            yi <<= 1;
            yf *= 2;
            zi <<= 1;
            zf *= 2;

            if (xf >= 1.0) {
                xi++;
                xf--;
            }
            if (yf >= 1.0) {
                yi++;
                yf--;
            }
            if (zf >= 1.0) {
                zi++;
                zf--;
            }
        }
        return r;
    };
}

export default Noise;