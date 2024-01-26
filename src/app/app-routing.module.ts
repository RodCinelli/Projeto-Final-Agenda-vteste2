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
    path: 'delete-produtos',
    loadChildren: () => import('./delete-produtos/delete-produtos.module').then( m => m.DeleteProdutosPageModule)
  },
  {
    path: 'edit-produtos',
    loadChildren: () => import('./edit-produtos/edit-produtos.module').then( m => m.EditProdutosPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
