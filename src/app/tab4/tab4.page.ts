import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user = { email: '', avatarUrl: '' };
  isUserLoggedIn = false;
  senhaCriptografada = '••••••'; // Representação da senha

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastController: ToastController 
  ) {}
  
  ngOnInit() {
    this.authService.getCurrentUserProfile().then(profile => {
      console.log('Perfil carregado:', profile); // Adiciona esta linha para depuração
      this.isUserLoggedIn = !!profile.email;
      this.user.email = profile.email;
      this.user.avatarUrl = profile.photoURL || 'assets/default-avatar.png';
    }).catch(error => {
      console.error('Erro ao carregar perfil:', error);
    });
  }
  
  irParaCarrinho() {
    this.router.navigateByUrl('/tabs/tab5');
  }

  async sair() {
    await this.authService.logout();
    await this.showToast('Usuário deslogado com sucesso');
    this.router.navigateByUrl('/tabs/tab1');
  }
  
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',  // Define a cor do toast para indicar sucesso
      position: 'top'    // Posiciona o toast no topo da tela
    });
    toast.present();
  }
}  
