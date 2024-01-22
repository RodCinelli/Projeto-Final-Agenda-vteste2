import { Injectable } from '@angular/core';
import { ProdutoTab2 } from './models/produtotab2.model';
import { ProdutoTab3 } from './models/produtotab3.model';

type ProdutoCarrinho = ProdutoTab2 | ProdutoTab3;

interface ItemCarrinho {
  produto: ProdutoCarrinho;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinho: ItemCarrinho[] = [];

  constructor() { }

  adicionarAoCarrinho(produto: ProdutoCarrinho) {
    const itemExistente = this.itensCarrinho.find(item => item.produto.nome === produto.nome);
    if (itemExistente) {
      itemExistente.quantidade += produto.quantidade;
    } else {
      this.itensCarrinho.push({ produto, quantidade: produto.quantidade });
    }
    // Reseta a quantidade do produto após adicioná-lo ao carrinho
    produto.quantidade = 0;
  }

  removerItem(index: number) {
    this.itensCarrinho.splice(index, 1);
  }

  getItensCarrinho() {
    return this.itensCarrinho;
  }

  // Aqui você pode adicionar outros métodos que achar necessário
}
