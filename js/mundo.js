export default class Mundo {
    constructor(canvas, largura, altura) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.largura = largura;
        this.altura = altura;
        this.populacao = [];
        this.predadores = [];
        this.comidas = [];
    }

    gerarComida() {
        this.comidas.push({
            x: Math.random() * this.largura,
            y: Math.random() * this.altura
        });
    }

    atualizar() {
        // Presas
        for (let i = this.populacao.length - 1; i >= 0; i--) {
            let s = this.populacao[i];
            s.viver(this.comidas, this.predadores);
            s.checarBordas();
            if (s.energia <= 0) this.populacao.splice(i, 1);
        }
        // Predadores
        for (let i = this.predadores.length - 1; i >= 0; i--) {
            let p = this.predadores[i];
            p.viver(this.populacao);
            p.checarBordas();
            if (p.energia <= 0) this.predadores.splice(i, 1);
        }
        if (Math.random() < 0.05) this.gerarComida();
    }

    desenhar() {
        this.ctx.fillStyle = 'rgba(10, 10, 30, 0.3)';
        this.ctx.fillRect(0, 0, this.largura, this.altura);

        this.comidas.forEach(c => {
            this.ctx.fillStyle = '#4ae216';
            this.ctx.beginPath();
            this.ctx.arc(c.x, c.y, 2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.populacao.forEach(s => {
            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, 5, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // mundo.js - dentro do desenhar()

        // Desenha Presas
        this.populacao.forEach(s => {
            // O tamanho agora varia entre 2 e 8 dependendo da energia
            const tamanho = Math.max(2, s.energia / 20); 
            this.ctx.fillStyle = s.dna.cor;
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, tamanho, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Desenha Predadores
        this.ctx.fillStyle = '#ff0000';
        this.predadores.forEach(p => {
            // O tamanho do quadrado varia conforme a energia
            const tamPred = Math.max(4, p.energy / 10);
            this.ctx.fillRect(p.x - tamPred, p.y - tamPred, tamPred * 2, tamPred * 2);
        });
        
    }
}

