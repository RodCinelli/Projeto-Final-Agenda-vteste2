import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user = { email: '', password: '' };

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastController: ToastController
  ) {}

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

  login() {
    if (!this.user.email || !this.user.password) {
      this.showToast('Por favor, preencha todos os campos.', 'warning');
      return;
    }
    this.authService.loginWithEmail(this.user.email, this.user.password)
    .then(() => {
      this.showToast('Login bem-sucedido!', 'success');
      this.router.navigateByUrl('/tabs/tab4');
      this.user = { email: '', password: '' }; // Limpa os campos após o login bem-sucedido
    })
      .catch(error => {
        let errorMessage = '';
  
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'Usuário não encontrado.';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Senha incorreta.';
        } else {
          errorMessage = 'Ocorreu um erro ao tentar fazer login.';
        }
  
        this.showToast(errorMessage, 'danger');
      });
  }
  
  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => {
        this.showToast('Login com Google bem-sucedido!', 'success');
        this.router.navigateByUrl('/tabs/tab4');
      })
      .catch(error => {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          console.error(error);
          this.showToast('Erro de login com Google: ' + error.message, 'danger');
        }
      });
  }
  
  navigateToRegister() {
    // Implemente a lógica para redirecionar para a página de registro
    this.router.navigateByUrl('/register'); // Substitua '/register' pelo caminho da sua página de registro
  }  

  voltarParaHome() {
    this.router.navigateByUrl('/tabs/tab1'); // Substitua '/tabs/tab1' pelo caminho correto para a sua página Home
  }  
}



