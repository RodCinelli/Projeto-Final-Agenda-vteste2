import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterPage } from './register.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD
export class RegisterPageRoutingModule {}
=======
export class RegisterPageRoutingModule {}
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440
