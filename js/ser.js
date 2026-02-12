export default class Ser {
    constructor(x, y, dna) {
        this.x = x;
        this.y = y;
        this.energia = 100;
        
        // DNA: Mantém a lógica de evitar o vermelho para as presas
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

    detectarAmeaca(listaPredadores) {
        let ameacaMaisProxima = null;
        let distMinima = this.dna.raioVisao * 0.7;

        for (let p of listaPredadores) {
            let d = Math.hypot(p.x - this.x, p.y - this.y);
            if (d < distMinima) {
                distMinima = d;
                ameacaMaisProxima = p;
            }
        }
        return ameacaMaisProxima;
    }

    fugir(ameaca) {
        let dx = this.x - ameaca.x;
        let dy = this.y - ameaca.y;
        let dist = Math.hypot(dx, dy);
        if (dist > 0) {
            // Fuga com bônus de 30% na velocidade
            this.x += (dx / dist) * this.dna.velocidade * 1.3;
            this.y += (dy / dist) * this.dna.velocidade * 1.3;
        }
    }

    buscarComida(listaComida) {
        let alvo = null;
        let dMin = this.dna.raioVisao;
        listaComida.forEach(c => {
            let d = Math.hypot(c.x - this.x, c.y - this.y);
            if (d < dMin) { dMin = d; alvo = c; }
        });
        return alvo;
    }

    moverPara(alvo) {
        let dx = alvo.x - this.x;
        let dy = alvo.y - this.y;
        let dist = Math.hypot(dx, dy);
        this.x += (dx / dist) * this.dna.velocidade;
        this.y += (dy / dist) * this.dna.velocidade;
    }

    tentarComer(alvo, lista) {
        if (Math.hypot(alvo.x - this.x, alvo.y - this.y) < 5) {
            lista.splice(lista.indexOf(alvo), 1);
            this.energia += 30;
        }
    }

    vagar() {
        this.x += (Math.random() - 0.5) * 2;
        this.y += (Math.random() - 0.5) * 2;
    }

    // Sistema de "Teletransporte" nas bordas
    checarBordas(largura, altura) {
        if (this.x > largura) this.x = 0;
        if (this.x < 0) this.x = largura;
        if (this.y > altura) this.y = 0;
        if (this.y < 0) this.y = altura;
    }
}
