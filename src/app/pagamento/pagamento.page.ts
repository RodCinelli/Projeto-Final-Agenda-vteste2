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
    this.totalCarrinho = this.carrinhoService.getTotalCarrinho(); // Obtenha o total do carrinho do CarrinhoService
  }

  async confirmarPagamento() {
    if (this.metodoPagamento) {
      const toast = await this.toastController.create({
        message: 'Compra efetuada com sucesso!',
        duration: 2000,
        color: 'success',
        position: 'top'
      });
      toast.present();
  
      // Limpe o carrinho após a compra
      this.carrinhoService.limparCarrinho();
      this.itensCarrinho = [];
      this.totalCarrinho = 0;
    } else {
      const toast = await this.toastController.create({
        message: 'Selecione um método de pagamento',
        duration: 2000,
        color: 'danger',
        position: 'top'
      });
      toast.present();
    }
  }

  voltarAoCarrinho() {
    this.navCtrl.navigateBack('/tabs/tab5'); // Método para voltar ao carrinho
  }
}