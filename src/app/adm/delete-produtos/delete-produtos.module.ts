import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeleteProdutosPageRoutingModule } from './delete-produtos-routing.module';

import { DeleteProdutosPage } from './delete-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeleteProdutosPageRoutingModule
  ],
  declarations: [DeleteProdutosPage]
})
export class DeleteProdutosPageModule {}
