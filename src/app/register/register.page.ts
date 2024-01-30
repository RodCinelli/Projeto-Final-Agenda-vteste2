import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  user = { email: '', password: '' };
  avatarUrl: string | null = null; // Adicionado para manter a URL do avatar

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private toastController: ToastController, 
    private storage: AngularFireStorage,
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

  register() {
    // Verificar se os campos estão preenchidos
    if (!this.user.email || !this.user.password) {
      this.showToast('Por favor, preencha todos os campos.', 'warning');
      return;
    }
  
    // Verificar o comprimento da senha
    if (this.user.password.length < 6) {
      this.showToast('A senha deve ter no mínimo 6 caracteres.', 'warning');
      return;
    }
  
    this.authService.registerWithEmail(this.user.email, this.user.password)
    .then(() => {
      // ... sucesso ...
      this.router.navigateByUrl('/tabs/tab4');
      this.user = { email: '', password: '' }; // Limpa os campos
      this.avatarUrl = 'assets/default-avatar.png'; // Redefine o avatar para o padrão
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
      // ... sucesso ...
      this.router.navigateByUrl('/tabs/tab4');
      this.avatarUrl = 'assets/default-avatar.png'; // Redefine o avatar para o padrão
    })
      .catch(error => {
        // Ignora os erros específicos de popup fechada pelo usuário e popup conflitante
        if (error.code !== 'auth/popup-closed-by-user' && error.code !== 'auth/cancelled-popup-request') {
          let errorMessage = 'Erro no registro com Google: ' + error.message;
          this.showToast(errorMessage, 'danger');
        }
      });
  }
  
  voltarParaHome() {
    this.router.navigateByUrl('/tabs/tab1'); // Substitua '/tabs/tab1' pelo caminho correto para a sua página Home
  }  

  uploadAvatar(event: any) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `Avatar/${new Date().getTime()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);

      uploadTask.snapshotChanges().toPromise().then(() => {
        fileRef.getDownloadURL().toPromise().then(url => {
          this.avatarUrl = url; // Atualiza a URL do avatar
          // Aqui você pode salvar a URL no perfil do usuário ou no banco de dados
          console.log('URL do Avatar:', url);
          this.showToast('Avatar atualizado com sucesso.', 'success');
        });
      }).catch(error => {
        console.error('Erro ao fazer upload:', error);
        this.showToast('Erro ao atualizar o avatar.', 'danger');
      });
    }
  }
}
  

