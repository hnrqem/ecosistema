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
// No topo do ser.js, vamos adicionar a largura e altura como propriedades globais 
// ou passá-las no constructor. Como o seu main.js não passa essas info, 
// vamos usar as medidas fixas que você definiu (1100x800).

moverPara(alvo) {
    const LARGURA = 1100;
    const ALTURA = 800;

    let dx = alvo.x - this.x;
    let dy = alvo.y - this.y;

    // Lógica Toroidal: Se a distância for maior que metade da tela, 
    // significa que é mais perto ir pelo outro lado.
    if (Math.abs(dx) > LARGURA / 2) {
        dx = dx > 0 ? dx - LARGURA : dx + LARGURA;
    }
    if (Math.abs(dy) > ALTURA / 2) {
        dy = dy > 0 ? dy - ALTURA : dy + ALTURA;
    }

    let dist = Math.hypot(dx, dy);

    if (dist > 0) {
        this.x += (dx / dist) * this.dna.velocidade;
        this.y += (dy / dist) * this.dna.velocidade;
    }
}

// O buscarComida também precisa dessa lógica para não ignorar alvos do outro lado
buscarComida(listaComida) {
    const LARGURA = 1100;
    const ALTURA = 800;
    let alvo = null;
    let dMin = this.dna.raioVisao;

    listaComida.forEach(c => {
        let dx = Math.abs(c.x - this.x);
        let dy = Math.abs(c.y - this.y);

        // Ajuste de distância para a borda
        if (dx > LARGURA / 2) dx = LARGURA - dx;
        if (dy > ALTURA / 2) dy = ALTURA - dy;

        let d = Math.hypot(dx, dy);
        if (d < dMin) {
            dMin = d;
            alvo = c;
        }
    });
    return alvo;
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


