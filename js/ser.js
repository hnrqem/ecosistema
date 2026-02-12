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

    // Atualize o método viver no ser.js
viver(listaComida, listaPredadores) {
    this.energia -= 0.1; // Custo de vida

    // 1. Verificar se há perigo por perto
    let perigo = this.detectarAmeaca(listaPredadores);

    if (perigo) {
        this.fugir(perigo);
        this.energia -= 0.1; // Fugir gasta mais energia!
    } else {
        // 2. Se não houver perigo, busca comida normalmente
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
    let distMinima = this.dna.raioVisao * 0.8; // Só foge se estiver bem perto

    for (let p of listaPredadores) {
        let d = Math.sqrt((p.x - this.x) ** 2 + (p.y - this.y) ** 2);
        if (d < distMinima) {
            distMinima = d;
            ameacaMaisProxima = p;
        }
    }
    return ameacaMaisProxima;
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
    // Dentro da classe Ser em ser.js
    fugir(ameaca) {
        // 1. Calcula a direção para longe do predador
        let dx = this.x - ameaca.x;
        let dy = this.y - ameaca.y;
        
        // 2. Normaliza a distância (pitágoras)
        let distancia = Math.sqrt(dx * dx + dy * dy);
        
        if (distancia > 0) {
            // Move-se na direção oposta multiplicada pela velocidade
            // Adicionamos um bônus de velocidade para a "adrenalina" da fuga
            const velocidadeFuga = this.dna.velocidade * 1.2;
            this.x += (dx / distancia) * velocidadeFuga;
            this.y += (dy / distancia) * velocidadeFuga;
        }
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


