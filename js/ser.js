// ser.js
export default class Ser {
    constructor(x, y, dna = null) {
        this.x = x;
        this.y = y;
        this.energia = 100;
        
        this.dna = dna || {
            velocidade: Math.random() * 2 + 1,
            raioVisao: Math.random() * 150 + 100,
            cor: `hsl(${Math.random() * 280+40}, 70%, 50%)`
        };
    }

    viver(listaComida) {
        this.energia -= 0.15; 
        
        const alvo = this.buscarComida(listaComida);
        
        if (alvo) {
            this.moverPara(alvo);
            this.tentarComer(alvo, listaComida);
        } else {
            this.vagar();
        }
    }

    buscarComida(listaComida) {
        let maisProxima = null;
        let distMinima = this.dna.raioVisao;

        for (let comida of listaComida) {
            const d = Math.sqrt((comida.x - this.x) ** 2 + (comida.y - this.y) ** 2);
            if (d < distMinima) {
                distMinima = d;
                maisProxima = comida;
            }
        }
        return maisProxima;
    }

    moverPara(alvo) {
        const dx = alvo.x - this.x;
        const dy = alvo.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 1) {
            this.x += (dx / dist) * this.dna.velocidade;
            this.y += (dy / dist) * this.dna.velocidade;
        }
        this.energia -= this.dna.velocidade * 0.1;
    }

    tentarComer(alvo, listaComida) {
        const d = Math.sqrt((alvo.x - this.x) ** 2 + (alvo.y - this.y) ** 2);
        if (d < 15) {
            const index = listaComida.indexOf(alvo);
            if (index > -1) {
                listaComida.splice(index, 1);
                this.energia += 50;
            }
        }
    }

    vagar() {
        this.x += (Math.random() - 0.5) * this.dna.velocidade;
        this.y += (Math.random() - 0.5) * this.dna.velocidade;
    }

    // Dentro da classe Ser no arquivo ser.js

tentarReproduzir() {
    // Se ele acumulou muita energia (ex: 150), ele se divide
    if (this.energia > 150) {
        this.energia -= 70; // Perde energia para "parir" o filho

        // O filho herda o DNA do pai com uma pequena MUTACÃO
        const dnaFilho = {
            velocidade: this.dna.velocidade + (Math.random() * 0.2 - 0.1), 
            raioVisao: this.dna.raioVisao + (Math.random() * 20 - 10), // Variação de visão
            cor: this.dna.cor // Mantém a cor da linhagem
        };

        // Impede que o DNA fique "estragado" (visão negativa ou velocidade zero)
        dnaFilho.velocidade = Math.max(0.5, dnaFilho.velocidade);
        dnaFilho.raioVisao = Math.max(20, dnaFilho.raioVisao);

        return new Ser(this.x, this.y, dnaFilho);
    }
    return null;
}
}
