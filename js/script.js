const container = document.getElementById("container")
let apletas = []
const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

const manipulaClick = (evento) => {
    const id = evento.currentTarget.dataset.id
    const nome = evento.currentTarget.dataset.nome
    const desc = evento.currentTarget.dataset.desc

    // Criando cookies de quem foi clicado (ficam disponíveis em todo o site)
    document.cookie = `id=${id}`
    document.cookie = `nome=${nome}`
    document.cookie = `desc=${desc}`

    // Session
    sessionStorage.setItem("id", id)
    sessionStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))

    // Local
    localStorage.setItem("id", id)
    localStorage.setItem("atleta", JSON.stringify(evento.currentTarget.dataset))


    window.location = `detalhes.html?id=${id}`
}

const montaCard = (atleta) => {
    const cartao = document.createElement("div");
    cartao.classList.add("cartao")
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const desc = document.createElement("p");
    const link = document.createElement("a");


    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    // link.innerHTML = "Saiba mais..."
    // link.href = `detalhes.html?id=${atleta.id}`
    // cartao.appendChild(link)

    cartao.dataset.id = atleta.id;
    cartao.dataset.nome = atleta.nome;
    cartao.dataset.desc = atleta.detalhes;

    cartao.onclick = manipulaClick;

    container.appendChild(cartao)
}

if(sessionStorage.getItem("logado")){
    pega_json("https://botafogo-atletas.mange.li/2024-1/all").then(
        (retorno) => {
            retorno.forEach((atleta) => montaCard(atleta))
        }
    )
}

const verificaSenha = () => {
    const entrada = document.getElementById("password").value
    const senha = "ded6a687514227ff822d40bd397f30f5ae9132487ad6c846599131c740d784f0"
    if (senha === hex_sha256(entrada)){
        sessionStorage.setItem("logado", "sim")
        alert("Login realizado com sucesso!")
        window.location = 'paginalogin.html'
    } else {
        alert("Senha incorreta!")
    }
 }
const saiu = () => {
    document.getElementById("logout").onclick = () => {
        sessionStorage.removeItem("logado")
        alert("Logout realizado com sucesso!")
        window.location = 'index.html'
    }

}

if(sessionStorage.getItem("logado")){
    function semliberta() {
        container.innerHTML = '';
        pega_json("https://botafogo-atletas.mange.li/2024-1/all").then(
            (retorno) => {
                retorno.forEach((atleta) => montaCard(atleta))
                apletas = retorno
            }
        )
    }
    function masc() {
        container.innerHTML = '';
        pega_json("https://botafogo-atletas.mange.li/2024-1/masculino").then(
            (retorno) => {
                retorno.forEach((atleta) => montaCard(atleta))
                apletas = retorno
            }
        )
    }
    function muie() {
        container.innerHTML = '';
        pega_json("https://botafogo-atletas.mange.li/2024-1/feminino").then(
            (retorno) => {
                retorno.forEach((atleta) => montaCard(atleta))
                apletas = retorno
            }
        )
    }
    function filtroPesquisa(){
        container.innerHTML = '';
        const valor = document.getElementById("pesquisar")
        apletas.forEach((atleta) => {
            if (atleta.nome.toUpperCase().includes(valor.value.toUpperCase())){
                montaCard(atleta)
            }
        })
    }
    function limpafil(){
        container.innerHTML = '';

    }
} 