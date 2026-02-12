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

    // ser.js

// Novo método para calcular a distância levando em conta as bordas
distanciaToroidal(alvoX, alvoY) {
    let dx = Math.abs(alvoX - this.x);
    let dy = Math.abs(alvoY - this.y);

    // Se a distância for maior que metade da tela, o caminho mais curto é pelo outro lado
    if (dx > this.largura / 2) dx = this.largura - dx;
    if (dy > this.altura / 2) dy = this.altura - dy;

    return Math.hypot(dx, dy);
}

moverPara(alvo) {
    let dx = alvo.x - this.x;
    let dy = alvo.y - this.y;

    // Ajuste para atravessar a borda horizontal
    if (Math.abs(dx) > this.largura / 2) {
        this.x -= Math.sign(dx) * this.dna.velocidade;
    } else {
        this.x += Math.sign(dx) * this.dna.velocidade;
    }

    // Ajuste para atravessar a borda vertical
    if (Math.abs(dy) > this.altura / 2) {
        this.y -= Math.sign(dy) * this.dna.velocidade;
    } else {
        this.y += Math.sign(dy) * this.dna.velocidade;
    }
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

