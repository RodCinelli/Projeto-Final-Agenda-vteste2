import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProdutosPage } from './edit-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: EditProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProdutosPageRoutingModule {}
