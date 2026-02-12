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
        this.ctx.fillStyle = 'rgba(2, 2, 5, 0.4)';
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
            this.ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
            this.ctx.fill();
        });

        this.predadores.forEach(p => {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(p.x - 5, p.y - 5, 10, 10);
        });
    }
}
