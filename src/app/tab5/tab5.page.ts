import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(
    private carrinhoService: CarrinhoService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Aqui você pode carregar dados quando a página for iniciada, se necessário
  }

  // Retorna os itens do carrinho para serem exibidos no template
  public getItensCarrinho() {
    return this.carrinhoService.getItensCarrinho();
  }

  // Remove o item selecionado do carrinho e exibe um toast de confirmação
  async removerDoCarrinho(index: number) {
    this.carrinhoService.removerItem(index);
    const toast = await this.toastController.create({
      message: 'Item removido do carrinho!',
      duration: 2000,
      position: 'top',
      color: 'danger' // A cor do toast está definida para vermelho
    });
    toast.present();
  }
}
