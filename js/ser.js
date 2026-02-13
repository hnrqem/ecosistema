export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 100;

        this.larguraMundo = 1100;
        this.alturaMundo = 800;

        this.dna = dna || {
            velocidade: Math.random() * 1 + 1,
            raioVisao: Math.random() * 120 + 120,
            cor: `hsl(${Math.random() * 280 + 40}, 70%, 50%)`
        };
    }

    viver(listaComida, listaPredadores) {
        this.energia -= 0.15;

        let ameaca = this.detectarAmeaca(listaPredadores);

        if (ameaca) {
            this.fugir(ameaca);
        } else {
            let alvo = this.buscarComida(listaComida);

            if (alvo) {
                this.moverPara(alvo);
                this.tentarComer(alvo, listaComida);
            } else {
                this.vagar();
            }
        }
    }

    moverPara(alvo) {
        const dx = alvo.x - this.x;
        const dy = alvo.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
            this.x += (dx / dist) * this.dna.velocidade;
            this.y += (dy / dist) * this.dna.velocidade;
        }
    }

    fugir(ameaca) {
        const dx = ameaca.x - this.x;
        const dy = ameaca.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
            this.x -= (dx / dist) * this.dna.velocidade;
            this.y -= (dy / dist) * this.dna.velocidade;
        }
    }

    buscarComida(lista) {
        let alvo = null;
        let dMin = this.dna.raioVisao;

        for (let i = 0; i < lista.length; i++) {
            const dx = lista[i].x - this.x;
            const dy = lista[i].y - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist < dMin) {
                dMin = dist;
                alvo = lista[i];
            }
        }

        return alvo;
    }

    detectarAmeaca(lista) {
        let ameaca = null;
        let dMin = this.dna.raioVisao * 0.7;

        for (let i = 0; i < lista.length; i++) {
            const dx = lista[i].x - this.x;
            const dy = lista[i].y - this.y;
            const dist = Math.hypot(dx, dy);

            if (dist < dMin) {
                dMin = dist;
                ameaca = lista[i];
            }
        }

        return ameaca;
    }

    tentarComer(alvo, lista) {
        const dx = alvo.x - this.x;
        const dy = alvo.y - this.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 7) {
            const i = lista.indexOf(alvo);
            if (i > -1) {
                lista.splice(i, 1);
                this.energia += 30;
            }
        }
    }

    vagar() {
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
    }

    checarBordas() {
        if (this.x > this.larguraMundo) this.x = 0;
        if (this.x < 0) this.x = this.larguraMundo;
        if (this.y > this.alturaMundo) this.y = 0;
        if (this.y < 0) this.y = this.alturaMundo;
    }
}
