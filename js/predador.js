import Ser from './ser.js';

export default class Predador extends Ser {
    constructor(x, y) {
        super(x, y);
        this.energia = 150;

        this.dna = {
            velocidade: 2.2,
            raioVisao: 350,
            cor: '#ff0000'
        };
    }

    viver(listaPresas) {
        this.energia -= 0.2;

        let alvo = this.buscarComida(listaPresas);

        if (alvo) {
            this.moverPara(alvo);
            this.tentarComerPresa(alvo, listaPresas);
        } else {
            this.vagar();
        }
    }

    tentarComerPresa(alvo, lista) {
        const dx = alvo.x - this.x;
        const dy = alvo.y - this.y;

        if (Math.hypot(dx, dy) < 10) {
            const index = lista.indexOf(alvo);
            if (index > -1) {
                lista.splice(index, 1);
                this.energia += 70;
            }
        }
    }
}

