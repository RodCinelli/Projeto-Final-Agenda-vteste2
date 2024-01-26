import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private carrinhoService: CarrinhoService,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Inicialização
  }

  // Retorna os itens do carrinho para serem exibidos no template
  public getItensCarrinho() {
    return this.carrinhoService.getItensCarrinho();
  }

  // Retorna o total do carrinho
  getTotalCarrinho() {
    return this.carrinhoService.getTotalCarrinho();
  }

  // Remove o item selecionado do carrinho e exibe um toast de confirmação
  async removerDoCarrinho(index: number) {
    this.carrinhoService.removerItem(index);
    const toast = await this.toastController.create({
      message: 'Item removido do carrinho!',
      duration: 2000,
      position: 'top',
      color: 'danger'
    });
    toast.present();
  }

  // Função para navegar até a página de pagamento
  irParaPagamento() {
    this.navCtrl.navigateForward('/pagamento');
  }

  // Função para verificar se há itens no carrinho
  temItensNoCarrinho(): boolean {
    return this.getItensCarrinho().length > 0;
  }
}
