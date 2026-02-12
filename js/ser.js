export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 100;
        
        // DNA: Atributos genéticos
        this.dna = dna || {
            velocidade: Math.random() * 2 + 1,
            raioVisao: Math.random() * 100 + 100,
            cor: `hsl(${Math.random() * 280 + 40}, 70%, 50%)`
        };
    }

    viver(listaComida, listaPredadores) {
        this.energia -= 0.15; // Metabolismo base

        // 1. Prioridade máxima: Fugir de predadores
        let ameaca = this.detectarAmeaca(listaPredadores);
        if (ameaca) {
            this.fugir(ameaca);
            this.energia -= 0.1; // Fuga consome energia extra
        } else {
            // 2. Se estiver seguro, busca comida
            let alvo = this.buscarComida(listaComida);
            if (alvo) {
                this.moverPara(alvo);
                this.tentarComer(alvo, listaComida);
            } else {
                this.vagar();
            }
        }
    }

    // Calcula distância considerando o "atalho" pelas bordas
    obterDistanciaToroidal(alvoX, alvoY) {
        const LARGURA = 1100;
        const ALTURA = 800;
        let dx = Math.abs(alvoX - this.x);
        let dy = Math.abs(alvoY - this.y);

        if (dx > LARGURA / 2) dx = LARGURA - dx;
        if (dy > ALTURA / 2) dy = ALTURA - dy;

        return { dx, dy, dist: Math.hypot(dx, dy) };
    }

    detectarAmeaca(listaPredadores) {
        let ameacaMaisProxima = null;
        let distMinima = this.dna.raioVisao * 0.7;

        for (let p of listaPredadores) {
            const info = this.obterDistanciaToroidal(p.x, p.y);
            if (info.dist < distMinima) {
                distMinima = info.dist;
                ameacaMaisProxima = p;
            }
        }
        return ameacaMaisProxima;
    }

    fugir(ameaca) {
        const LARGURA = 1100;
        const ALTURA = 800;

        let dx = this.x - ameaca.x;
        let dy = this.y - ameaca.y;

        // Se o predador está do outro lado da borda, ajustamos o vetor de fuga
        if (Math.abs(dx) > LARGURA / 2) dx = dx > 0 ? dx - LARGURA : dx + LARGURA;
        if (Math.abs(dy) > ALTURA / 2) dy = dy > 0 ? dy - ALTURA : dy + ALTURA;

        let dist = Math.hypot(dx, dy);
        if (dist > 0) {
            this.x += (dx / dist) * this.dna.velocidade * 1.3;
            this.y += (dy / dist) * this.dna.velocidade * 1.3;
        }
    }

    buscarComida(listaComida) {
        let alvo = null;
        let dMin = this.dna.raioVisao;

        listaComida.forEach(c => {
            const info = this.obterDistanciaToroidal(c.x, c.y);
            if (info.dist < dMin) {
                dMin = info.dist;
                alvo = c;
            }
        });
        return alvo;
    }

    moverPara(alvo) {
        const LARGURA = 1100;
        const ALTURA = 800;

        let dx = alvo.x - this.x;
        let dy = alvo.y - this.y;

        // Lógica de atalho pela borda
        if (Math.abs(dx) > LARGURA / 2) dx = dx > 0 ? dx - LARGURA : dx + LARGURA;
        if (Math.abs(dy) > ALTURA / 2) dy = dy > 0 ? dy - ALTURA : dy + ALTURA;

        let dist = Math.hypot(dx, dy);
        if (dist > 0) {
            this.x += (dx / dist) * this.dna.velocidade;
            this.y += (dy / dist) * this.dna.velocidade;
        }
    }

    tentarComer(alvo, lista) {
        const info = this.obterDistanciaToroidal(alvo.x, alvo.y);
        if (info.dist < 5) {
            lista.splice(lista.indexOf(alvo), 1);
            this.energia += 30;
        }
    }

    vagar() {
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
    }

    checarBordas(largura, altura) {
        if (this.x > largura) this.x = 0;
        if (this.x < 0) this.x = largura;
        if (this.y > altura) this.y = 0;
        if (this.y < 0) this.y = altura;
    }
