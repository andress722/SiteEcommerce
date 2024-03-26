document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cadastroForm');
    const inputs = form.querySelectorAll('input[data-required]');

    // Adiciona listener para verificar campos ao enviar o formulário
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o envio do formulário padrão
        limpaErros(); // Limpa erros anteriores
        const erros = [];

        inputs.forEach(input => {
            if (!input.value.trim()) { // Verifica se o campo está vazio
                erros.push(`O campo "${input.name}" é obrigatório.`);
                exibeErro(input, `O campo "${input.name}" é obrigatório.`);
            }
        });

        // Verifica se as senhas são iguais
        const senha = document.getElementById('senha').value;
        const repeatSenha = document.getElementById('repeatSenha').value;
        if (senha !== repeatSenha) {
            erros.push('As senhas não conferem.');
            exibeErro(document.getElementById('repeatSenha'), 'As senhas não conferem.');
        }

        // Se houver erros, exibe-os e impede o envio do formulário
        if (erros.length > 0) {
            exibeErros(erros);
        } else {
            // Submeter o formulário se não houver erros
            form.submit();
        }
    });

    // Adiciona listeners para limpar erros quando os campos são alterados
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            limpaErro(this);
        });
    });

    // Função para exibir erro em um campo
    function exibeErro(elemento, mensagem) {
        const divErro = document.createElement('div');
        divErro.classList.add('erro');
        divErro.textContent = mensagem;
        elemento.parentNode.appendChild(divErro);
        elemento.classList.add('erro-input');
    }

    // Função para exibir erros em uma lista
    function exibeErros(erros) {
        const listaErros = document.querySelector('.lista-erros');
        erros.forEach(erro => {
            const li = document.createElement('li');
            li.textContent = erro;
            listaErros.appendChild(li);
        });
    }

    // Função para limpar erro de um campo
    function limpaErro(elemento) {
        const divErro = elemento.parentNode.querySelector('.erro');
        if (divErro) {
            divErro.remove();
            elemento.classList.remove('erro-input');
        }
    }

    // Função para limpar todos os erros
    function limpaErros() {
        const erros = document.querySelectorAll('.erro');
        erros.forEach(erro => erro.remove());
        inputs.forEach(input => input.classList.remove('erro-input'));
        const listaErros = document.querySelector('.lista-erros');
        if (listaErros) {
            listaErros.innerHTML = '';
        }
    }
});
