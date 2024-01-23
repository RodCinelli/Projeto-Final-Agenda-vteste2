import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProdutosPageRoutingModule } from './edit-produtos-routing.module';

import { EditProdutosPage } from './edit-produtos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProdutosPageRoutingModule
  ],
  declarations: [EditProdutosPage]
})
export class EditProdutosPageModule {}
