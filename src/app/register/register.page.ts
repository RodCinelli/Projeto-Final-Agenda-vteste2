import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  user = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.registerWithEmail(this.user.email, this.user.password)
      .then(() => {
        // Navega para a página de perfil ou a página que você deseja após o registro
        this.router.navigateByUrl('/perfil');
      })
      .catch(error => {
        console.error(error);
        // Aqui, você pode adicionar um tratamento de erro adequado
      });
  }

  registerWithGoogle() {
    this.authService.registerWithGoogle()
      .then(() => {
        // Navega para a página de perfil ou a página que você deseja após o registro
        this.router.navigateByUrl('/perfil');
      })
      .catch(error => {
        console.error(error);
        // Tratamento de erro
      });
  }
}
