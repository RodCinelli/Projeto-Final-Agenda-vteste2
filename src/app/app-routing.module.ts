import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CadProdutosPage } from './adm/cad-produtos/cad-produtos.page';
import { DeleteProdutosPage } from './adm/delete-produtos/delete-produtos.page';
import { EditProdutosPage } from './adm/edit-produtos/edit-produtos.page';


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
    path: 'cad-produtos',
    loadChildren: () => import('./adm/cad-produtos/cad-produtos.module').then( m => m.CadProdutosPageModule)
  },
  {
    path: 'delete-produtos',
    loadChildren: () => import('./adm/delete-produtos/delete-produtos.module').then( m => m.DeleteProdutosPageModule)
  },
  {
    path: 'edit-produtos',
    loadChildren: () => import('./adm/edit-produtos/edit-produtos.module').then( m => m.EditProdutosPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
