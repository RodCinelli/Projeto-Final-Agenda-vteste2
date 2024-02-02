import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
<<<<<<< HEAD
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
=======
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  user = { email: '', password: '' };
<<<<<<< HEAD
  avatarFile: File | null = null;
  avatarUrl: string = 'assets/default-avatar.png';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController,
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}
=======

  constructor(private authService: AuthService, private router: Router, private toastController: ToastController) {}
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440

  async showToast(message: string, color: string = 'dark') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color
    });
    toast.present();
  }

<<<<<<< HEAD
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
  
=======
  register() {
    // Verificar se os campos estão preenchidos
    if (!this.user.email || !this.user.password) {
      this.showToast('Por favor, preencha todos os campos.', 'warning');
      return;
    }
  
    // Verificar o comprimento da senha
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440
    if (this.user.password.length < 6) {
      this.showToast('A senha deve ter no mínimo 6 caracteres.', 'warning');
      return;
    }
  
<<<<<<< HEAD
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
=======
    this.authService.registerWithEmail(this.user.email, this.user.password)
    .then(() => {
      // ... sucesso ...
      this.router.navigateByUrl('/tabs/tab4');
      this.user = { email: '', password: '' }; // Limpa os campos após o registro bem-sucedido
    })
      .catch(error => {
        let errorMessage = '';
  
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'O e-mail já está em uso.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'E-mail inválido.';
        } else {
          errorMessage = 'Erro ao registrar: ' + error.message;
        }
  
        this.showToast(errorMessage, 'danger');
      });
  }
  
  registerWithGoogle() {
    this.authService.registerWithGoogle()
      .then(() => {
        this.showToast('Registro com Google bem-sucedido!', 'success');
        this.router.navigateByUrl('/tabs/tab4');
      })
      .catch(error => {
        // Ignora os erros específicos de popup fechada pelo usuário e popup conflitante
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          let errorMessage = 'Erro no registro com Google: ' + error.message;
          this.showToast(errorMessage, 'danger');
        }
      });
  }
<<<<<<< HEAD

  voltarParaLogin() {
    this.router.navigateByUrl('/login');
  }
}
=======
  
  voltarParaHome() {
    this.router.navigateByUrl('/tabs/tab1'); // Substitua '/tabs/tab1' pelo caminho correto para a sua página Home
  }  
}
>>>>>>> f9ceda96a349b2382d9349c9773e820774fff440
