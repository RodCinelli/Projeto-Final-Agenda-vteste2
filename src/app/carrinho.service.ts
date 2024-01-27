import { Injectable } from '@angular/core';
import { ProdutoTab2 } from './models/produtotab2.model';
import { ProdutoTab3 } from './models/produtotab3.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
type ProdutoCarrinho = ProdutoTab2 | ProdutoTab3;

export interface ItemCarrinho {
  id?: string;
  produto: ProdutoCarrinho;
  quantidade: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private itensCarrinho: ItemCarrinho[] = [];

  constructor(private firestore: AngularFirestore) { 
    this.carregarItensCarrinho();
  }

  carregarItensCarrinho() {
    this.firestore.collection<ItemCarrinho>('carrinho').snapshotChanges().subscribe(snapshot => {
      this.itensCarrinho = snapshot.map(doc => {
        const data = doc.payload.doc.data() as ItemCarrinho;
        const id = doc.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  salvarItensCarrinho() {
    this.itensCarrinho.forEach(item => {
      this.firestore.collection('carrinho').doc(item.id).set(item);
    });
  }

  adicionarAoCarrinho(produto: ProdutoCarrinho) {
    const itemExistente = this.itensCarrinho.find(item => item.produto.nome === produto.nome);
    if (itemExistente) {
      itemExistente.quantidade += produto.quantidade;
    } else {
      const id = this.firestore.createId();
      this.itensCarrinho.push({ id, produto, quantidade: produto.quantidade });
    }
    // Reseta a quantidade do produto após adicioná-lo ao carrinho
    produto.quantidade = 0;
    this.salvarItensCarrinho();
  }

  atualizarCarrinho(novosItensCarrinho: ItemCarrinho[]) {
    this.itensCarrinho = novosItensCarrinho;
    this.salvarItensCarrinho();
  }

  removerItem(index: number) {
    const item = this.itensCarrinho[index];
    if (item.id) {
      this.firestore.collection('carrinho').doc(item.id).delete();
    }
    this.itensCarrinho.splice(index, 1);
  }

  getItensCarrinho() {
    return this.itensCarrinho;
  }

  getTotalCarrinho() {
    return this.itensCarrinho.reduce((total, item) => total + (item.produto.preco * item.quantidade), 0);
  }

  limparCarrinho() {
    this.itensCarrinho = [];
  }

  limparCarrinhoFirestore() {
    this.itensCarrinho.forEach(item => {
      this.firestore.collection('carrinho').doc(item.id).delete();
    });
    this.itensCarrinho = [];
  }
}