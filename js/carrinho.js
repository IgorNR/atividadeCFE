function adicionarAoCarrinho(idProduto) {    
    const produto = produtos.find(p => p.id === idProduto);
    
    if (produto) {        
        localStorage.setItem('produtoSelecionado', JSON.stringify(produto));        
        window.location.href = 'carrinho.html';
    }
}

function carregarCarrinho() {
    const produtoSelecionado = localStorage.getItem('produtoSelecionado');
    
    if (!produtoSelecionado) {        
        window.location.href = 'index.html';
        return;
    }
    
    const produto = JSON.parse(produtoSelecionado);
    const tbody = document.querySelector('tbody');    
    
    tbody.innerHTML = '';    
    
    const total = produto.valor;
    tbody.innerHTML = `
        <tr>
            <td>${produto.nome}</td>
            <td>1</td>
            <td>R$ ${produto.valor.toFixed(2).replace('.', ',')}</td>
            <td>R$ ${total.toFixed(2).replace('.', ',')}</td>
        </tr>
        <tr class="total-row">
            <td colspan="3"><strong>Valor Final</strong></td>
            <td><strong>R$ ${total.toFixed(2).replace('.', ',')}</strong></td>
        </tr>
    `;    
   
    window.pedidoAtual = {
        produto: produto.nome,
        descricao: produto.descricao,
        valor: produto.valor,
        total: total
    };
}

function enviarPedido(event) {
    event.preventDefault();
    
    const nome = document.getElementById('inNome').value;
    const pedido = window.pedidoAtual;
    
    if (!nome) {
        alert('Por favor, preencha seu nome');
        return;
    }    
  
    let mensagem = `Pedido de ${nome}:\n`;
    mensagem += `Produto: ${pedido.produto}\n`;
    mensagem += `Descrição: ${pedido.descricao}\n`;
    mensagem += `Valor: R$ ${pedido.valor.toFixed(2).replace('.', ',')}\n`;
    mensagem += `Total: R$ ${pedido.total.toFixed(2).replace('.', ',')}\n`;
    
    if (confirm(`Deseja enviar este pedido?\n\n${mensagem}`)) {
        mensagem = encodeURI(mensagem);        
        const link = `https://api.whatsapp.com/send?phone=5561986122584&text=${mensagem}`;
        window.open(link, '_blank');        
        
        localStorage.removeItem('produtoSelecionado');
    }
}

function voltarAoIndice() {
    localStorage.removeItem('produtoSelecionado');
    window.location.href = 'index.html';
}
