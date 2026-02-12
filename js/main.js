import Mundo from './mundo.js';
import Ser from './ser.js';
import Predador from './predador.js';

const canvas = document.getElementById('simulador');
canvas.width = 800;
canvas.height = 600;

const meuMundo = new Mundo(canvas, 800, 600);

// Criar seres iniciais
for(let i=0; i<20; i++) {
    meuMundo.populacao.push(new Ser(Math.random()*800, Math.random()*600));
}

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Clique cria Predador
    meuMundo.predadores.push(new Predador(x, y));
});

function loop() {
    meuMundo.atualizar();
    meuMundo.desenhar();

    // Atualiza o HTML (Os IDs devem existir no seu index.html!)
    const pPresas = document.getElementById('count');
    const pPreds = document.getElementById('predCount');
    if(pPresas) pPresas.innerText = meuMundo.populacao.length;
    if(pPreds) pPreds.innerText = meuMundo.predadores.length;

    requestAnimationFrame(loop);
}

loop();
