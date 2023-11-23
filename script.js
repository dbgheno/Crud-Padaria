const produtosPadaria = [
    { id: 'LP1T6TEF', nome: 'Pão de forma', estoque: 40, preco: 6, },
    { id: 'LP1TG0L0', nome: 'Cacetinho', estoque: 40, preco: 1, },
    { id: 'LP1T123X', nome: 'Cuca', estoque: 30, preco: 8, },
    { id: 'LP1TCRTE', nome: 'Salame', estoque: 20, preco: 15, },
    { id: 'LP1TFU5C', nome: 'Queijo', estoque: 10, preco: 30, },
    { id: 'LP1T55AB', nome: 'Cueca virada', estoque: 25, preco: 3, },
    { id: 'LP1TPETA', nome: 'Schmier', estoque: 30, preco: 10, },
    { id: 'LP1TASCX', nome: 'Nata', estoque: 30, preco: 10, },
    { id: 'LP1TXINO', nome: 'Leite', estoque: 20, preco: 5, },
    { id: 'LP1TLKIO', nome: 'Enroladinho', estoque: 35, preco: 2, },
    { id: 'LP1TMTFS', nome: 'Torta', estoque: 5, preco: 35, },
    { id: 'LP1T45ZS', nome: 'Manteiga', estoque: 16, preco: 35, }
]

function bemVindo() {
    const opcao = prompt(`
        Bem vindo ao sistema da Padaria do Seu João!
        Escolha uma das opções para interagir com o sistema:
        1  - Listar produtos disponíveis;
        2  - Adicionar um novo produto;
        3  - Editar um produto do catálogo;
        4  - Remover um produto do catálogo;
        5  - Pedidos de clientes;
        6  - Exibir valor de venda total do estoque;
        7  - Relatório diário de vendas;
        8  - Sair do sistema;
    `);
    opcao === '' ? bemVindo() : opcao === null ? sairDoSistema() : qualOpcao(Number(opcao))
}

function qualOpcao(opcao) {
    switch (opcao) {
        case 1: listarProdutos(); break;
        case 2: novoProduto(); break;
        case 3: atualizarProduto(); break;
        case 4: removerProduto(); break;
        // case 5: (); break;
        // case 6: (); break;
        // case 7: (); break;
        // case 8: (); break;
        default: alert(`Opção inválida!`); bemVindo(); break;
    }
}
bemVindo();

// Opção 1 - Listagem de produtos
function listarProdutos(list = produtosPadaria) {
    const tipoListagem = prompt(`Qual listagem deseja ver:\n 1 - Listagem simplificada;\n 2 - Listagem por preço;\n 3 - Listagem por ordem alfabética;`)
    if (tipoListagem === null) {
        bemVindo()
    } else if (tipoListagem === '') {
        listarProdutos()
    } else if (tipoListagem === '1') {
        let produtos = ''
        list.forEach(produto => {
            produtos += `ID: ${produto.id.slice(0, 4)}-${produto.id.slice(4, 8)} | Produto: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${produto.preco.toLocaleString('pt-BR')}\n`
        })
        alert(produtos)
        bemVindo()
    } else if (tipoListagem === '2') {
        const porPreco = produtosPadaria.slice().sort((a, b) => a.preco - b.preco);
        let produtos = ''
        porPreco.forEach(porPreco2 => {
            produtos += `ID: ${porPreco2.id.slice(0, 4)}-${porPreco2.id.slice(4, 8)} | Produto: ${porPreco2.nome} | Estoque: ${porPreco2.estoque} | Preço: R$${porPreco2.preco.toLocaleString('pt-BR')}\n`
        })
        alert(produtos)
        bemVindo()
    } else if (tipoListagem === '3') {
        alfabetica = list.slice().sort((a, b) => a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 1)
        let produtos = ''
        alfabetica.forEach(produto => {
            produtos += `ID: ${produto.id.slice(0, 4)}-${produto.id.slice(4, 8)} | Produto: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${produto.preco.toLocaleString('pt-BR')}\n`
        })
        alert(produtos)
        bemVindo()
    }
}

// Opção 2 - Adicionar um novo produto
function novoProduto() {
    let modelo = '', estoque = '', preco = '', produto = {}
    while (modelo === '') modelo = prompt(`Digite o nome do produto:`)
    if (modelo === null) { produto = null; bemVindo() } else {
        while (estoque === '') estoque = prompt(`Digite o estoque do produto:`)
        if (estoque === null) { produto = null; bemVindo() } else {
            while (preco === '') preco = prompt(`Digite o preco do produto:`)
            if (preco === null) { produto = null; bemVindo() }
            produto = {
                id: Date.now().toString(36).toUpperCase(),
                nome: modelo,
                estoque: isNaN(parseFloat(estoque)) ? 0 : parseFloat(estoque),
                preco: isNaN(parseFloat(preco)) ? 0 : parseFloat(preco)
            }
        }
    }
    produtosPadaria.push(produto)
    alert(`Produto ${produto.nome} cadastrado com sucesso!`)
    bemVindo()
}

// Opção 3 - Atualizar produto
function atualizarProduto(list = produtosPadaria) {
    const identificador = prompt(`Digite o código identificador do produto:`)
    if (identificador === null) bemVindo()
    if (identificador === '') atualizarProduto()
    const verificador = identificador.toUpperCase()

    const indiceProduto = list.findIndex(produto => produto.id === verificador)

    if (indiceProduto === -1) {
        alert(`Produto não encontrado!\n Consulte a opção 1 para verificar os identificadores referentes aos produtos disponíveis.`)
        bemVindo()
    } else {
        let nNome = '', nEstoque = '', nPreco = ''
        const novoNome = confirm(`Você deseja alterar o nome deste produto?`)
        if (novoNome) {
            const nomeNovo = () => nNome = prompt(`Qual o novo nome?`)
            if (nNome === null) bemVindo()
            else if (nNome === '') nomeNovo()
            else nNome === null
            const novoEstoque = confirm(`Você deseja alterar o estoque deste produto?`)
            if (novoEstoque) {
                const estoqueNovo = () => nEstoque = prompt(`Qual o novo estoque?\n(digite um número válido)`)
                if (nEstoque === null) bemVindo()
                else if (nEstoque === '' || nEstoque < 0 || isNaN(nEstoque)) estoqueNovo()
                else nEstoque = null
                const novoPreco = confirm(`Você deseja alterar o preço deste produto?`)
                if (novoPreco) {
                    let precoNovo = () => nPreco = prompt(`Qual o novo preco?\n(digite um número válido)`)
                    if (nPreco === null) bemVindo()
                    else if (nPreco === '' || nPreco < 0 || isNaN(nPreco)) precoNovo()
                } else nPreco = null
                list[indiceProduto].nome = nNome
                list[indiceProduto].estoque = nEstoque
                list[indiceProduto].preco = nPreco
                if (novoNome || novoEstoque || novoPreco) { alert(`Produto ${verificador} atualizado com sucesso!`) }
                bemVindo()
            }
        }
    }
}

// Opção 4 - Remover produto
function removerProduto(list = produtosPadaria) {
    const identificador = prompt(`Digite o código identificador do produto:`)
    if (identificador === null) bemVindo()
    if (identificador === '') atualizarProduto()
    const verificador = identificador.toUpperCase()

    const indiceProduto = list.findIndex(produto => produto.id === verificador)

    if (indiceProduto === -1) {
        alert(`Produto não encontrado!\n Consulte a opção 1 para verificar os identificadores referentes aos produtos disponíveis.`)
        bemVindo()
    } else {
        const remover = confirm(`Você realmente deseja remover este produto?`)
        if (remover) {
            list.splice(indiceProduto, 1)
            alert(`Produto ${verificador} removido com sucesso!`)
        }
    }
    bemVindo()
}

