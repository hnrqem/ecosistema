import Mundo from './mundo.js';
import Ser from './ser.js';
import Predador from './predador.js';



const canvas = document.getElementById('simulador');
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

const meuMundo = new Mundo(canvas);


//gera uma quantidade inicial de comida
for (let i = 0; i < 50; i++) {
    meuMundo.gerarComida();
}

//cria as bolinhas iniciais
for (let i = 0; i < 5; i++) {
    meuMundo.populacao.push(new Ser(Math.random() * canvas.width, Math.random() * canvas.height));
}

meuMundo.predadores.push(new Predador(100, 100));
function loop() {
    meuMundo.atualizar();
    meuMundo.desenhar();

    const elementoPresas = document.getElementById('count');
    const elementoPredadores = document.getElementById('predCount');

    if (elementoPresas) {
        elementoPresas.innerText = meuMundo.populacao.length;
    }
    
    if (elementoPredadores) {
        elementoPredadores.innerText = meuMundo.predadores.length;
    }

    requestAnimationFrame(loop);
}

canvas.addEventListener('mousedown', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (event.button === 0) { 
        // botão esquerdo cria o predador
        meuMundo.predadores.push(new Predador(x, y));
    } else if (event.button === 2) { 
        // botão direito cria a presa
        meuMundo.populacao.push(new Ser(x, y));
    }
});

canvas.oncontextmenu = (e) => e.preventDefault();

canvas.oncontextmenu = (e) => e.preventDefault();

loop();

