import Mundo from './mundo.js';
import Ser from './ser.js';
import Predador from './predador.js';

const canvas = document.getElementById('simulador');
canvas.width = 1100;
canvas.height = 800;

const meuMundo = new Mundo(canvas, 1100, 800);

// Criar seres iniciais
// No seu main.js, mude o loop de criação inicial:
for(let i=0; i<20; i++) {
    // Agora usando as medidas totais do seu novo canvas
    meuMundo.populacao.push(new Ser(Math.random() * 1100, Math.random() * 800));
}

canvas.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Clique cria Predador
    meuMundo.predadores.push(new Predador(x, y));
    
});

canvas.addEventListener('mouseup', (e) => {
    e.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Clique cria ser
    meuMundo.populacao.push(new Ser(x, y));
    
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




