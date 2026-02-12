export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 100;
        this.larguraMundo = 1100; // Ajustado para seu novo canvas
        this.alturaMundo = 800;
        
        this.dna = dna || {
            velocidade: Math.random() * 2 + 1,
            raioVisao: Math.random() * 100 + 100,
            cor: `hsl(${Math.random() * 280 + 40}, 70%, 50%)`
        };
    }

    viver(listaComida, listaPredadores) {
        this.energia -= 0.15;
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

    // Calcula a direção mais curta atravessando a borda
    obterVetorCurto(alvoX, alvoY) {
        let dx = alvoX - this.x;
        let dy = alvoY - this.y;

        if (Math.abs(dx) > this.larguraMundo / 2) {
            dx = dx > 0 ? dx - this.larguraMundo : dx + this.larguraMundo;
        }
        if (Math.abs(dy) > this.alturaMundo / 2) {
            dy = dy > 0 ? dy - this.alturaMundo : dy + this.alturaMundo;
        }
        return { dx, dy, dist: Math.hypot(dx, dy) };
    }

    moverPara(alvo) {
        const v = this.obterVetorCurto(alvo.x, alvo.y);
        if (v.dist > 0) {
            this.x += (v.dx / v.dist) * this.dna.velocidade;
            this.y += (v.dy / v.dist) * this.dna.velocidade;
        }
    }

    fugir(ameaca) {
        const v = this.obterVetorCurto(ameaca.x, ameaca.y);
        if (v.dist > 0) {
            this.x -= (v.dx / v.dist) * this.dna.velocidade * 1.3;
            this.y -= (v.dy / v.dist) * this.dna.velocidade * 1.3;
        }
    }

    buscarComida(listaComida) {
        let alvo = null;
        let dMin = this.dna.raioVisao;
        listaComida.forEach(c => {
            const v = this.obterVetorCurto(c.x, c.y);
            if (v.dist < dMin) {
                dMin = v.dist;
                alvo = c;
            }
        });
        return alvo;
    }

    detectarAmeaca(listaPredadores) {
        let ameaca = null;
        let dMin = this.dna.raioVisao * 0.7;
        listaPredadores.forEach(p => {
            const v = this.obterVetorCurto(p.x, p.y);
            if (v.dist < dMin) {
                dMin = v.dist;
                ameaca = p;
            }
        });
        return ameaca;
    }

    tentarComer(alvo, lista) {
        const v = this.obterVetorCurto(alvo.x, alvo.y);
        if (v.dist < 7) {
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
        else if (this.x < 0) this.x = this.larguraMundo;
        if (this.y > this.alturaMundo) this.y = 0;
        else if (this.y < 0) this.y = this.alturaMundo;
    }
}
