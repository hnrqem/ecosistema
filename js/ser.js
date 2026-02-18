export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 250;

        this.larguraMundo = 1100;
        this.alturaMundo = 800;

        this.dna = dna || {
            velocidade: Math.random() * 1 + 1,
            raioVisao: Math.random() * 120 + 120,
            cor: `hsl(${Math.random() * 280 + 40}, 70%, 50%)`
        };
    }

    viver(listaComida, listaPredadores) {
        this.energia -= 0.1;

        let ameaca = this.detectarAmeaca(listaPredadores);

        if (ameaca) {
            this.fugir(ameaca);
            this.energia -= 0.1; 
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

   
    obterVetorCurto(alvoX, alvoY) {
        let dx = alvoX - this.x;
        let dy = alvoY - this.y;

        if (Math.abs(dx) > this.larguraMundo / 2) {
            dx = dx > 0 ? dx - this.larguraMundo : dx + this.larguraMundo;
        }

        if (Math.abs(dy) > this.alturaMundo / 2) {
            dy = dy > 0 ? dy - this.alturaMundo : dy + this.alturaMundo;
        }

        return { dx, dy };
    }

    moverPara(alvo) {
        const { dx, dy } = this.obterVetorCurto(alvo.x, alvo.y);
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
            this.x += (dx / dist) * this.dna.velocidade;
            this.y += (dy / dist) * this.dna.velocidade;
        }
    }

    fugir(ameaca) {
        const { dx, dy } = this.obterVetorCurto(ameaca.x, ameaca.y);
        const dist = Math.hypot(dx, dy);

        if (dist > 0) {
            this.x -= (dx / dist) * this.dna.velocidade;
            this.y -= (dy / dist) * this.dna.velocidade;
        }
    }

    buscarComida(lista) {
        let alvo = null;
        let dMin2 = this.dna.raioVisao * this.dna.raioVisao;

        for (let i = 0; i < lista.length; i++) {
            const { dx, dy } = this.obterVetorCurto(lista[i].x, lista[i].y);
            const dist2 = dx * dx + dy * dy;

            if (dist2 < dMin2) {
                dMin2 = dist2;
                alvo = lista[i];
            }
        }

        return alvo;
    }

    detectarAmeaca(lista) {
        let ameaca = null;
        let dMin2 = (this.dna.raioVisao * 0.7) ** 2;

        for (let i = 0; i < lista.length; i++) {
            const { dx, dy } = this.obterVetorCurto(lista[i].x, lista[i].y);
            const dist2 = dx * dx + dy * dy;

            if (dist2 < dMin2) {
                dMin2 = dist2;
                ameaca = lista[i];
            }
        }

        return ameaca;
    }

    tentarComer(alvo, lista) {
        const { dx, dy } = this.obterVetorCurto(alvo.x, alvo.y);
        const dist2 = dx * dx + dy * dy;

        if (dist2 < 7 * 7) {
            const i = lista.indexOf(alvo);
            if (i > -1) {
                lista.splice(i, 1);
                this.energia += 30;
            }
        }
    }

    vagar() {
        this.x += (Math.random() - 0.5) * this.dna.velocidade;
        this.y += (Math.random() - 0.5) * this.dna.velocidade;
    }

    checarBordas() {
        if (this.x > this.larguraMundo) this.x = 0;
        if (this.x < 0) this.x = this.larguraMundo;
        if (this.y > this.alturaMundo) this.y = 0;
        if (this.y < 0) this.y = this.alturaMundo;
    }
}



