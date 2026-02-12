import Ser from './ser.js';

export default class Predador extends Ser {
    constructor(x, y) {
        super(x, y);
        this.energia = 150; // Começa com mais fôlego
        this.dna = {
            velocidade: 3.5, // Bem mais rápido que a presa
            raioVisao: 5000,   // Visão aguçada
            cor: '#ff0000'    // Vermelho intimidador
        };
    }

    // O predador ignora frutinhas e caça seres
    viver(listaSeres) {
        this.energia -= 0.4; // Gasta MUITO mais energia por ser rápido
        
        const alvo = this.buscarPresa(listaSeres);
        
        if (alvo) {
            this.moverPara(alvo);
            this.tentarComerPresa(alvo, listaSeres);
        } else {
            this.vagar();
        }
    }

    buscarPresa(listaSeres) {
        let maisProxima = null;
        let distMinima = this.dna.raioVisao;

        for (let ser of listaSeres) {
            // Não pode comer a si mesmo nem outros predadores
            if (ser === this) continue; 

            const d = Math.sqrt((ser.x - this.x) ** 2 + (ser.y - this.y) ** 2);
            if (d < distMinima) {
                distMinima = d;
                maisProxima = ser;
            }
        }
        return maisProxima;
    }

    tentarComerPresa(alvo, listaSeres) {
        const d = Math.sqrt((alvo.x - this.x) ** 2 + (alvo.y - this.y) ** 2);
        if (d < 15) {
            const index = listaSeres.indexOf(alvo);
            if (index > -1) {
                listaSeres.splice(index, 1); // Remove o bicho comido
                this.energia += 80; // Ganha muita energia por refeição
            }
        }
    }
}




