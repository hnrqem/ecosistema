export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 100;
        this.larguraMundo = 1100;
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

    // Calcula a direção mais curta (considerando a borda)
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
        const vetor = this.obterVetorCurto(alvo.x, alvo.y);
        if (vetor.dist > 0) {
            this.x += (vetor.dx / vetor.dist) * this.dna.velocidade;
            this.y += (vetor.dy / vetor.dist) * this.dna.velocidade;
        }
    }

    fugir(ameaca) {
        const vetor = this.obterVetorCurto(ameaca.x, ameaca.y);
        if (vetor.dist > 0) {
            // Foge na direção oposta do vetor curto
            this.x -= (vetor.dx / vetor.dist) * this.dna.velocidade * 1.3;
            this.y -= (vetor.dy / vetor.dist) * this.dna.velocidade * 1.3;
        }
    }

    buscarComida(listaComida) {
        let alvo = null;
        let dMin = this.dna.raioVisao;
        listaComida.forEach(c => {
            const vetor = this.obterVetorCurto(c.x, c.y);
            if (vetor.dist < dMin) {
                dMin = vetor.dist;
                alvo = c;
            }
        });
        return alvo;
    }

    detectarAmeaca(listaPredadores) {
        let ameaca = null;
        let dMin = this.dna.raioVisao * 0.7;
        listaPredadores.forEach(p => {
            const vetor = this.obterVetorCurto(p.x, p.y);
            if (vetor.dist < dMin) {
                dMin = vetor.dist;
                ameaca = p;
            }
        });
        return ameaca;
    }

    tentarComer(alvo, lista) {
        const vetor = this.obterVetorCurto(alvo.x, alvo.y);
        if (vetor.dist < 5) {
            const index = lista.indexOf(alvo);
            if (index > -1) lista.splice(index, 1);
            this.energia += 30;
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
