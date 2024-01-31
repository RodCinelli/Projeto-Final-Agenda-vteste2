import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  user = { email: '', password: '' };
  avatarFile: File | null = null;
  avatarUrl: string = 'assets/default-avatar.png';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
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

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatarFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => this.avatarUrl = e.target.result;
      reader.readAsDataURL(file);
    } else {
      this.showToast('Erro ao carregar o avatar.', 'danger');
    }
  }

  async register() {
    if (!this.user.email || !this.user.password || !this.avatarFile) {
      this.showToast('Por favor, preencha todos os campos e selecione um avatar.', 'warning');
      return;
    }
  
    if (this.user.password.length < 6) {
      this.showToast('A senha deve ter no mínimo 6 caracteres.', 'warning');
      return;
    }
  
    try {
      await this.authService.registerWithEmail(this.user.email, this.user.password, this.avatarFile);
      this.router.navigateByUrl('/tabs/tab4').then(() => {
        window.location.reload();
      });
      this.showToast('Cadastro realizado com sucesso!', 'success');
      this.user = { email: '', password: '' };
    } catch (error: any) {
      let errorMessage = '';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'O e-mail já está em uso.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'E-mail inválido.';
      } else {
        errorMessage = `Erro ao registrar: ${error.message}`;
      }
      this.showToast(errorMessage, 'danger');
    }
  }

  registerWithGoogle() {
    this.authService.registerWithGoogle()
      .then(async (result) => {
        if (result.user) {
          const avatarURL = result.user.photoURL || 'assets/default-avatar.png';
          const userRef = this.firestore.doc(`users/${result.user.uid}`);
          await userRef.set({
            uid: result.user.uid,
            email: result.user.email,
            photoURL: avatarURL,
            accountType: 'free' // Define a conta como 'free' por padrão
          }, { merge: true });

          this.router.navigateByUrl('/tabs/tab4').then(() => {
            window.location.reload();
          });
          this.showToast('Cadastro realizado com sucesso!', 'success');
        }
      })
      .catch((error: any) => {
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          let errorMessage = 'Erro no registro com Google: ' + error.message;
          this.showToast(errorMessage, 'danger');
        }
      });
  }

  voltarParaHome() {
    this.router.navigateByUrl('/tabs/tab1');
  }
}
