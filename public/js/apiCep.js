const preencherFormulario = (endereco) => {
    console.log(endereco)
    document.getElementById('endereco').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
};

const pesquisarCep = async () => {
    const cep = document.getElementById('cep').value;
    console.log(cep)
    const url = `http://viacep.com.br/ws/${cep}/json/`;
    const dados = await fetch(url);
    const endereco = await dados.json();
    console.log(endereco)
    preencherFormulario(endereco);
};

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('cep').addEventListener('blur', pesquisarCep);
});