import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadProdutosPage } from './cad-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: CadProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadProdutosPageRoutingModule {}
