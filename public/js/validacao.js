function validaCamposIguais(senhaField, repeatSenhaField) {
    const senha = senhaField.value;
    const repeatSenha = repeatSenhaField.value;
    const erros = [];

    if (senha !== repeatSenha) {
        erros.push('As senhas não conferem');
        senhaField.classList.add('has-error');
        repeatSenhaField.classList.add('has-error');
    }

    return erros;
}

function generateErrors(erros) {
    const listaErros = document.querySelector('.lista-erros');
    let ul = listaErros.querySelector('ul');

    if (!ul) {
        ul = document.createElement('ul');
        listaErros.appendChild(ul);
    }

    erros.forEach(e => {
        if (e) { // Verifica se o erro é válido
            const li = document.createElement('li');
            li.innerText = e;
            ul.appendChild(li);
        } else {
            const li = document.createElement('li');
            li.innerText = "Campo vazio ou diferente";
            ul.appendChild(li);
        }
    });
}

function validateRequired(form) {
    const erros = [];
    const inputs = form.querySelectorAll("[data-required]");
    const nome = document.getElementsByName('nome')[0];

    if (nome.value.length < 4) {
        erros.push('O campo nome precisa de mais caracteres!');
        nome.classList.add('has-error');
    }

    inputs.forEach(i => {
        if (!i.value) {
            erros.push(`preencha o campo "${i.placeholder}"`);
            i.classList.add('has-error');
        }
    });

    return erros;
}

function limpaErros(form) {
    form.querySelectorAll('input').forEach(i => {
        i.classList.remove('has-error');
    });
    const listaErros = form.querySelector('.lista-erros');
    if (listaErros) {
        listaErros.innerHTML = ''; // Corrigido para innerHTML
    }
}
