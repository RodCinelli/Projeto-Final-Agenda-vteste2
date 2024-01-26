import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importe NavController

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})
export class PagamentoPage {
  metodoPagamento: string = '';
  numeroParcelas: number = 1;
  totalCarrinho: number = 100; // Exemplo, substitua pela lógica do seu carrinho

  constructor(private navCtrl: NavController) {} // Injete NavController no construtor

  confirmarPagamento() {
    let totalFinal = this.totalCarrinho;

    if (this.metodoPagamento === 'Pix') {
      totalFinal *= 0.95; // Aplica desconto de 5%
    }

    // Lógica para processar o pagamento
    console.log(`Método de pagamento escolhido: ${this.metodoPagamento}`);
    if (this.metodoPagamento === 'cartao_credito') {
      console.log(`Número de parcelas: ${this.numeroParcelas}`);
    }
    console.log(`Total a pagar: R$ ${totalFinal.toFixed(2)}`);
  }

  voltarAoCarrinho() {
    this.navCtrl.navigateBack('/tabs/tab5'); // Método para voltar ao carrinho
  }
}
