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
  user = { email: '', photoURL: '' }; // Altere avatarUrl para photoURL
  isUserLoggedIn = false;
  senhaCriptografada = '••••••';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    this.authService.checkAuthState().subscribe(user => {
      if (user) {
        this.loadUserProfile();
      } else {
        // O usuário não está logado, você pode adicionar lógica adicional aqui se necessário
      }
    });
  }

  loadUserProfile() {
    this.authService.getCurrentUserProfile().then(profile => {
      if (profile) {
        console.log('Perfil do usuário:', profile);
        if ('email' in profile) {
          this.isUserLoggedIn = !!profile['email'];
          this.user.email = profile['email'];
        }
        if ('photoURL' in profile) {
          this.user.photoURL = profile['photoURL'] || 'assets/default-avatar.png';
        }
      }
    }).catch(error => {
      console.error('Erro ao carregar perfil:', error);
      // this.showToast('Erro ao carregar o perfil do usuário. Por favor, tente novamente.'); // Esta linha foi removida
    });
  }
  

  irParaCarrinho() {
    this.router.navigateByUrl('/tabs/tab5');
  }

  async sair() {
    await this.authService.logout();
    // Limpa as informações do usuário e define como deslogado
    this.user = { email: '', photoURL: '' }; // Altere avatarUrl para photoURL
    this.isUserLoggedIn = false;
    await this.showToast('Usuário deslogado com sucesso');
    this.router.navigateByUrl('/tabs/tab1');
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}