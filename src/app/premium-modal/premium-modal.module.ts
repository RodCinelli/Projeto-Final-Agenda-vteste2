import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PremiumModalPageRoutingModule } from './premium-modal-routing.module';

import { PremiumModalPage } from './premium-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PremiumModalPageRoutingModule
  ],
  declarations: [PremiumModalPage]
})
export class PremiumModalPageModule {}
