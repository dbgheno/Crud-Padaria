// A Padaria do Sr. João
// O Sr. João é um padeiro que sempre fez tudo à moda antiga. Recentemente, ele percebeu que muitos de seus clientes jovens usam aplicativos para fazer pedidos de pão e doces. Então, ele decidiu que era hora de modernizar sua padaria e criar um sistema online para receber pedidos.
// Ele contratou você, um desenvolvedor web, para criar um sistema simples que permita aos clientes fazerem pedidos online. O Sr. João quer que o sistema seja capaz de:

const produtosPadaria = [
    { id: 'LIPOTUFO', nome: 'Pão de forma', estoque: 40, preco: 6, },
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
    let opcao = prompt(`
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
    if (opcao === '') { bemVindo(); return }
    if (opcao === null) { sairDoSistema(); return }
    else opcao = Number(opcao)

    switch (opcao) {
        case 1: listarProdutos(); break;
        case 2: novoProduto(); break;
        case 3: atualizarProduto(); break;
        case 4: removerProduto(); break;
        case 5: pedidos(); break;
        case 6: somarEstoque(); break;
        case 7: relatorios(); break;
        case 8: sairDoSistema(); break;
        default: alert(`Opção inválida!`); bemVindo(); break;
    }
}
bemVindo();

// Opção 1 - Listagem de produtos
// Listar Todos os Produtos Disponíveis: O sistema deve ser capaz de exibir uma lista de todos os produtos disponíveis na padaria. João vai poder escolher no momento entre listagem simplificada, por ordem de preço, ou por ordem alfabética.
function listagem(list = produtosPadaria) {
    let produtos = ''
    const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    list.forEach(produto => produtos += `ID: ${produto.id.slice(0, 4)}-${produto.id.slice(4, 8)} | Produto: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${produto.preco.toLocaleString('pt-BR', options)}\n`)
    alert(produtos)
}

function listarProdutos(list = produtosPadaria) {
    const tipoListagem = prompt(`Qual listagem deseja ver:\n 1 - Listagem simplificada;\n 2 - Listagem por preço;\n 3 - Listagem por ordem alfabética;`)
    if (tipoListagem === null) { bemVindo(); return }
    if (tipoListagem === '') { listarProdutos(); return }
    if (tipoListagem === '1') { listagem(); bemVindo(); return }
    if (tipoListagem === '2') { const porPreco = list.slice().sort((a, b) => a.preco - b.preco); listagem(porPreco); bemVindo(); return }
    if (tipoListagem === '3') { alfabetica = list.slice().sort((a, b) => a.nome.toUpperCase() < b.nome.toUpperCase() ? -1 : 1); listagem(alfabetica); bemVindo(); return }
    else { alert(`Opção inválida!\nDigite umas das opções apresentadas!`); listarProdutos(); return }
}

// Opção 2 - Adicionar um novo produto
// Adicionar um Novo Produto ao Catálogo: O sistema deve permitir que o usuário adicione um novo produto ao catálogo. O produto deve ser adicionado com um nome, preço e estoque.
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
            produtosPadaria.push(produto)
            alert(`Produto ${produto.nome} cadastrado com sucesso!`)
            bemVindo()
        }
    }
}

// Opção 3 - Atualizar produto
// Editar Produto do Catálogo: O sistema deve permitir que o usuário edite as informações de um produto existente no catálogo. Lembre-se que o estoque nunca pode ser menor que 0.
function atualizarProduto(list = produtosPadaria) {
    const identificador = prompt(`Digite o código identificador do produto:`)
    if (identificador === null) { bemVindo(); return }
    if (identificador === '') { atualizarProduto(); return }
    const verificador = identificador.toUpperCase()
    const indiceProduto = list.findIndex(produto => produto.id === verificador)
    if (indiceProduto === -1) { alert(`Produto não encontrado!\nConsulte a opção 1 para verificar os identificadores referentes aos produtos disponíveis.`); bemVindo(); return }
    let nome = '', estoque = '', preco = ''

    const novoNome = confirm(`Você deseja alterar o nome deste produto?`)
    if (novoNome) { while (nome === '') nome = prompt(`Qual o novo nome?`); if (nome !== null) { list[indiceProduto].nome = nome } }

    const novoEstoque = confirm(`Você deseja alterar o estoque deste produto?`)
    if (novoEstoque) {
        while (estoque === '' || estoque < 0 || isNaN(estoque)) estoque = prompt(`Qual o novo estoque?\n(digite um número válido)`)
        if (estoque !== null) { list[indiceProduto].estoque = estoque }
    }

    const novoPreco = confirm(`Você deseja alterar o preço deste produto?`)
    if (novoPreco) {
        while (preco === '' || preco < 0 || isNaN(preco)) preco = prompt(`Qual o novo preco?\n(digite um número válido)`)
        if (preco !== null) { list[indiceProduto].preco = preco }
    }

    if (novoNome || novoEstoque || novoPreco) { alert(`Produto ${list[indiceProduto].nome} atualizado com sucesso!`) }
    bemVindo()
}

// Opção 4 - Remover produto
// Remover um Produto do Catálogo: O sistema deve permitir que o usuário remova um produto do catálogo.
function removerProduto(list = produtosPadaria) {
    const identificador = prompt(`Digite o código identificador do produto:`)
    if (identificador === null) { bemVindo(); return }
    if (identificador === '') { removerProduto(); return }
    const verificador = identificador.toUpperCase()
    const indiceProduto = list.findIndex(produto => produto.id === verificador)
    if (indiceProduto === -1) { alert(`Produto não encontrado!\nConsulte a opção 1 para verificar os identificadores referentes aos produtos disponíveis.`); bemVindo(); return }
    const nomeProduto = list[indiceProduto].nome

    const remover = confirm(`Você realmente deseja remover este produto?`)
    if (remover) { list.splice(indiceProduto, 1); alert(`Produto ${nomeProduto} removido com sucesso!`) }
    bemVindo()
}

// Opção 5 - Receber pedidos dos clientes
// O sistema deve permitir que os clientes façam pedidos. Um pedido deve conter um ou mais produtos e a quantidade desejada de cada um. O sistema deve armazenar um histórico de pedidos.
function pedidos(list = produtosPadaria) {
    const novoPedido = confirm(`Você deseja cadastrar um novo pedido?\nClick em "Cancel" caso queria apenas consultar o histórico de pedidos.`)
    if (novoPedido) {
        let produtos = ''
        const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        list.forEach((produto, numero) => produtos += `Número: ${numero} | Produto: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${produto.preco.toLocaleString('pt-BR', options)}\n`)

        function escolhaProduto() {
            let qualProduto = '', quantidade = ''
            while (qualProduto === '') qualProduto = prompt(`Digite o número do produto que você deseja incluir no pedido:\n${produtos}`)
            if (qualProduto !== null) {
                //identificar qual é o produto que foi escolhido (pelo index referente)
                // while (quantidade === '' || quantidade <= 0 || isNaN(quantidade)) quantidade = prompt(`Digite a quantidade de `'${nome do produto}'` que você deseja incluir:\nEstoque disponível:`'${estoque do produto}'`\n(digite um número válido e compatível com o estoque.)`)
                // if (quantidade !== null) {
                //     array.push({ produto: '', quantidade: '' })
                    // estoque do produto tal -= quantidade
                }
            }
        }
    }
// } FAZER ARRAY DO HISTÓRICO DE PEDIDOS NO ESCOPO GLOBAL
// FAZER OPÇÃO 7



// Opção 6 - Somar valor do estoque
// João deve poder somar o preço de venda do seu estoque
function somarEstoque(list = produtosPadaria) {
    const produtoEspecifico = confirm(`Você deseja somar o preço de venda do estoque de um produto específico?\nClick em "Cancel" caso queira a soma do estoque de todos os produtos.`)
    if (produtoEspecifico) {
        const identificador = prompt(`Digite o código identificador do produto:`)
        if (identificador === null) { bemVindo(); return }
        if (identificador === '') { removerProduto(); return }
        const verificador = identificador.toUpperCase()
        const indiceProduto = list.findIndex(produto => produto.id === verificador)
        if (indiceProduto === -1) { alert(`Produto não encontrado!\nConsulte a opção 1 para verificar os identificadores referentes aos produtos disponíveis.`); bemVindo(); return }
        const nomeProduto = list[indiceProduto].nome
        const somaEstoque = list[indiceProduto].estoque * list[indiceProduto].preco
        alert(`A soma do valor de estoque do produto ${nomeProduto} é R$ ${somaEstoque.toLocaleString('pt-BR')}`)
        bemVindo()
    } else {
        let somaTodos = 0
        list.forEach(produto => somaTodos += (produto.preco * produto.estoque))
        const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        alert(`A soma do valor de estoque de todos os produtos é R$ ${somaTodos.toLocaleString('pt-BR', options)}`)
        bemVindo()
    }
}

// Opção 7 - Relatório Diarios
// João deve poder fazer um relatório das vendas que aconteceram em um período específico que ele selecionar. Deve conter quantas vendas foram realizadas e qual o faturamento.
function relatorios(list = produtosPadaria) {

}

// Opção 8 - Sair o sistema
function sairDoSistema(list = produtosPadaria) {
    const sair = confirm(`Você tem certeza que deseja sair do sistema?`)
    if (sair) {
        let produtos = ''
        const options = { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        list.forEach(produto => produtos += `ID: ${produto.id.slice(0, 4)}-${produto.id.slice(4, 8)} | Produto: ${produto.nome} | Estoque: ${produto.estoque} | Preço: R$ ${produto.preco.toLocaleString('pt-BR', options)}<br>`)
        document.write(produtos)
    } else {
        bemVindo()
    }
}