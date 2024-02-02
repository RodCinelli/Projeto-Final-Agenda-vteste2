import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule)
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule)
  },
  {
    path: 'tabs/cad-produtos',
    loadChildren: () => import('./cad-produtos/cad-produtos.module').then( m => m.CadProdutosPageModule)
  },
  {
    path: 'tabs/delete-produtos',
    loadChildren: () => import('./delete-produtos/delete-produtos.module').then( m => m.DeleteProdutosPageModule)
  },
  {
    path: 'tabs/edit-produtos',
    loadChildren: () => import('./edit-produtos/edit-produtos.module').then( m => m.EditProdutosPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pagamento/pagamento.module').then(m => m.PagamentoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
<<<<<<< HEAD
  },
  {
  path: 'premium-modal',
    loadChildren: () => import('./premium-modal/premium-modal.module').then( m => m.PremiumModalPageModule)
=======
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
