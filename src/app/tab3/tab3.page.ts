import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../carrinho.service';
import { ProdutoTab3 } from '../models/produtotab3.model';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  produtos: ProdutoTab3[] = [
    {
      nome: 'Camisa Social Slim Empório Colombo',
      imagem: 'assets/produtos/produtodesconto1.png',
      precoOriginal: 79.90, // Preço antes do desconto
      preco: 59.90, // Preço com desconto
      quantidade: 0
    },

    {
      nome: 'Camisa Gola Polo Red Bull F1 Malha Piquet',
      imagem: 'assets/produtos/produtodesconto2.png',
      precoOriginal: 69.90, // Preço antes do desconto
      preco: 50.00, // Preço com desconto
      quantidade: 0
    }, 

    {
      nome: 'Camisa Poliéster Masculina P/ Academia Exercícios',
      imagem: 'assets/produtos/produtodesconto3.png',
      precoOriginal: 45.90, // Preço antes do desconto
      preco: 35.90, // Preço com desconto
      quantidade: 0
    }, 

    {
      nome: 'Regata Oversized Masculina Brooklyn Bronx New York',
      imagem: 'assets/produtos/produtodesconto4.png',
      precoOriginal: 69.90, // Preço antes do desconto
      preco: 49.90, // Preço com desconto
      quantidade: 0
    }, 

    {
      nome: 'Calça Jeans Masculina 8 Bolsos Command Ártico',
      imagem: 'assets/produtos/produtodesconto5.png',
      precoOriginal: 170.00, // Preço antes do desconto
      preco: 145.90, // Preço com desconto
      quantidade: 0
    }, 

    {
      nome: 'Bermuda Short Masculino Cargo Sarja Brim Camuflada Militar',
      imagem: 'assets/produtos/produtodesconto6.png',
      precoOriginal: 78.90, // Preço antes do desconto
      preco: 59.00, // Preço com desconto
      quantidade: 0
    }, 

    {
      nome: 'Sapatenis Masculino Polo Plus Original',
      imagem: 'assets/produtos/produtodesconto7.png',
      precoOriginal: 97.90, // Preço antes do desconto
      preco: 59.90, // Preço com desconto
      quantidade: 0
    }, 
  ];

  constructor(
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  incrementarProduto(index: number) {
    this.produtos[index].quantidade++;
  }

  decrementarProduto(index: number) {
    if (this.produtos[index].quantidade > 0) {
      this.produtos[index].quantidade--;
    }
  }

  async adicionarAoCarrinho(produto: ProdutoTab3) {
    if (produto.quantidade > 0) {
      this.carrinhoService.adicionarAoCarrinho(produto);
      const toast = await this.toastController.create({
        message: 'Item adicionado ao carrinho!',
        duration: 2000,
        position: 'top',
        color: 'success'
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione ao menos uma quantidade antes de adicionar ao carrinho',
        duration: 2000,
        position: 'top',
        color: 'warning'
      });
      toast.present();
    }
  }

  calcularDesconto(produto: ProdutoTab3): string {
    const desconto = ((produto.precoOriginal - produto.preco) / produto.precoOriginal) * 100;
    return `${desconto.toFixed(0)}% OFF`; // Arredonda o percentual e adiciona a string 'OFF'
  }
}
