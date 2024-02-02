import { Component, OnInit } from '@angular/core';
import { CarrinhoService, ItemCarrinho } from '../carrinho.service'; // Importe a interface ItemCarrinho
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage implements OnInit {
  itensCarrinho: ItemCarrinho[] = []; // Defina o tipo como ItemCarrinho[]
  totalCarrinho: number = 0; // Inicialize com 0
  metodoPagamento: string = ''; // Inicialize com string vazia
  numeroParcelas: number = 1;

  constructor(private carrinhoService: CarrinhoService, private navCtrl: NavController, private toastController: ToastController) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.getItensCarrinho(); // Obtenha os itens do carrinho do CarrinhoService
    this.calcularTotal(); // Chame o método calcularTotal() após obter os itens do carrinho
  }

  calcularTotal() {
    let total = 0;
    for (let item of this.itensCarrinho) {
      total += item.produto.preco * item.quantidade;
    }
  
    // Aplica um desconto de 5% se o método de pagamento for Pix
    if (this.metodoPagamento === 'Pix') {
      total = total * 0.95;
    }
  
    this.totalCarrinho = total;
  }

  async confirmarPagamento() {
    // Verifica se há itens no carrinho
    if (this.itensCarrinho.length === 0) {
      const toast = await this.toastController.create({
        message: 'Não há itens no seu carrinho',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
    } else if (this.metodoPagamento) {
      const toast = await this.toastController.create({
        message: 'Compra efetuada com sucesso!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
  
      // Limpe o carrinho após a compra
      this.carrinhoService.limparCarrinhoFirestore();
      this.itensCarrinho = [];
      this.totalCarrinho = 0;
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione um método de pagamento',
        duration: 2000,
        color: 'warning',
        position: 'top'
      });
      toast.present();
    }
  }

  voltarAoCarrinho() {
    this.navCtrl.navigateBack('/tabs/tab5'); // Método para voltar ao carrinho
  }
}