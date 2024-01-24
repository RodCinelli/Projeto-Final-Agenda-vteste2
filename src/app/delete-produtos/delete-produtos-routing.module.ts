import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeleteProdutosPage } from './delete-produtos.page';

const routes: Routes = [
  {
    path: '',
    component: DeleteProdutosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeleteProdutosPageRoutingModule {}
