import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page {

  constructor(private router: Router) {}

  irParaCarrinho() {
    this.router.navigateByUrl('/tabs/tab5'); // Substitua pelo caminho correto para a aba do carrinho
  }

  sair() {
    // Redireciona para a aba 'Home'
    this.router.navigateByUrl('/tabs/tab1'); // Substitua 'tabs/tab1' pelo caminho correto da sua aba 'Home'
  }
}
