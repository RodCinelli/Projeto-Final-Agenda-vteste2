import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PagamentoPageRoutingModule } from './pagamento-routing.module';
import { PagamentoPage } from './pagamento.page'; // Importe PagamentoPage

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PagamentoPageRoutingModule
  ],
  declarations: [PagamentoPage] // Declare PagamentoPage aqui
})
export class PagamentoPageModule {} // Sem a declaração de classe aqui
