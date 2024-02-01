import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PremiumModalPage } from '../premium-modal/premium-modal.page';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  user = { email: '', photoURL: '', accountType: '' }; // Adicione accountType aqui
  isUserLoggedIn = false;
  senhaCriptografada = '••••••';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private toastController: ToastController,
    private modalController: ModalController // Injete o ModalController aqui
  ) {}

  ngOnInit() {
    this.authService.checkAuthState().subscribe(user => {
      if (user) {
        this.loadUserProfile();
      }
    });

    // Adicione o ouvinte para o evento userBecamePremium
    this.authService.userBecamePremium.subscribe(() => {
      this.showToast('Parabéns!! Agora você é um usuário Premium!');
      this.loadUserProfile();
    });
  }

  loadUserProfile() {
    this.authService.getCurrentUserProfile().then(profile => {
      if (profile) {
        console.log('Perfil do usuário:', profile);
        this.isUserLoggedIn = true;
        this.user.email = profile.email;
        this.user.photoURL = profile.photoURL || 'assets/default-avatar.png';
        this.user.accountType = profile.accountType; // Carrega o tipo de conta
      }
    }).catch(error => {
      console.error('Erro ao carregar perfil:', error);
    });
  }

  async openPremiumModal() {
    const modal = await this.modalController.create({
      component: PremiumModalPage,
    });
    return await modal.present();
  }
  
  irParaCarrinho() {
    this.router.navigateByUrl('/tabs/tab5');
  }

  async sair() {
    await this.authService.logout();
    // Atualize o objeto user para resetar todos os campos, incluindo accountType
    this.user = { email: '', photoURL: '', accountType: '' };
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