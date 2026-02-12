import Ser from './ser.js';

export default class Predador extends Ser {
    constructor(x, y) {
        super(x, y);
        this.energia = 150;
        this.dna = {
            velocidade: 3.2,
            raioVisao: 250,
            cor: '#ff0000'
        };
    }

    viver(listaPresas) {
        this.energia -= 0.5; // Predador gasta energia muito rápido

        let alvo = this.buscarComida(listaPresas); // Busca seres em vez de pontos verdes
        if (alvo) {
            this.moverPara(alvo);
            this.tentarComerPresa(alvo, listaPresas);
        } else {
            this.vagar();
        }
    }

    tentarComerPresa(alvo, lista) {
        if (Math.hypot(alvo.x - this.x, alvo.y - this.y) < 10) {
            lista.splice(lista.indexOf(alvo), 1);
            this.energia += 70; // Grande bônus por capturar presa
        }
    }
}
