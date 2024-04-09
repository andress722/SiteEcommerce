var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
const {
	Usuario,
	UsuarioComum,
	Produto,
	Categoria,
	Carrinho,
	Pedido,
} = require('../models');
const multer = require('multer');

var session = require('express-session');
const usuario = require('./usuarioControl');
const axios = require('axios').default;

const pedidoController = {
	index: async function (req, res) {
		const pedidos = await Carrinho.findAll();
		return res.render('pedidos', { pedidos });
	},
	adiciona: async (req, res) => {
		const idProduto = req.params.idProduto;
		const produtos = await Produto.findByPk(idProduto);

		if (!produtos) {
			return res.render('form-servico-erro', {
				mensagemErro: 'Produto não existe',
			});
		}

		return res.render('visualizar-produto', { produtos });
	},

	adicionaPost: async (req, res) => {
		const idProdutos = req.params.idProdutos;
		const usuario = req.session.usuarioLogado.id;
		console.log(idProdutos);
		try {
			await Carrinho.create({
				id_produto: idProdutos,
				id_usuario: usuario,
			});

			return res.redirect('/pedidos/vercarrinho');
		} catch (error) {
			console.log(error);
			return res.render('form-servico-erro', {
				mensagemErro: 'Erro ao criar carrinho',
			});
		}
	},

	refreshQuantaty: async (req, res) => {
	
		try {
			const { id, produto, quantidade, valor, total, pedidos } = req.body;
			console.log('chamou a rota');
			const cart = {
				produto: produto.toString(),
				id_produto: id.toString(),
				quantidade: quantidade.toString(),
				valor: valor.toString(),
				total: total.toString(),
				id_usuario: usuario,
				numero_pedido: pedidos,
			};
			console.log(cart);
			const createdCart = await Carrinho.create(cart);
    // Verificar se o carrinho foi criado corretamente
    if (createdCart) {
        // Carrinho criado com sucesso
        console.log(createdCart, 'criou');
    } else {
        // Algo deu errado ao criar o carrinho
		console.log('erro' );
    }
		} catch (error) {
			return res.render('form-servico-erro', {
				mensagemErro:
					'Erro ao criar pedido, tente novamente ou entre contato conosco',
			});
		}
	
	},

	verCarrinho: async function (req, res) {
		try {
			let usuario = req.session.usuarioLogado.id;
			console.log(usuario)
			let usuarios = await UsuarioComum.findByPk(usuario);
			const obj = {
				usuarios: usuarios,
			};

			return res.render('carrinho', obj);
		} catch (error) {
			console.log(error);
			return res.render('carrinho-not');
		}
	},

	pagamento: async function (req, res) {
		return res.render('mercado-pago');
	},

	enviarPedido: async function (req, res) {
		try {
			const { id, produto, quantidade, valor, total, pedidos } = req.body;
			console.log('chamou a rota');
			const cart = {
				produto: produto.toString(),
				id_produto: id.toString(),
				quantidade: quantidade.toString(),
				valor: valor.toString(),
				total: total.toString(),
				id_usuario: usuario,
				numero_pedido: pedidos,
			};
			console.log(cart, 'chamou');
			const createdCart = await Carrinho.create(cart);
    // Verificar se o carrinho foi criado corretamente
    if (createdCart) {
        // Carrinho criado com sucesso
        console.log(createdCart, 'criou');
    } else {
        // Algo deu errado ao criar o carrinho
		console.log('erro' );
    }
		} catch (error) {
			return res.render('form-servico-erro', {
				mensagemErro:
					'Erro ao criar pedido, tente novamente ou entre contato conosco',
			});
		}

	},
};

module.exports = pedidoController;
