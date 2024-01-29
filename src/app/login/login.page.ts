import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Importe o Router para navegação pós-login

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  user = { email: '', password: '' }; // Objeto para armazenar email e senha

  constructor(private authService: AuthService, private router: Router) {}

  // Função para lidar com login normal
  login() {
    this.authService.loginWithEmail(this.user.email, this.user.password)
      .then(() => {
        this.router.navigateByUrl('/perfil'); // Redirecionar para a página de perfil após o login
      })
      .catch(error => {
        console.error(error);
        // Aqui você pode adicionar a lógica para exibir alguma mensagem de erro
      });
  }
  
  // Função para lidar com login com Google
  loginWithGoogle() {
    this.authService.loginWithGoogle()
      .then(() => {
        this.router.navigateByUrl('/perfil'); // Redirecionar para a página de perfil após o login
      })
      .catch(error => {
        console.error(error);
        // Aqui você pode adicionar a lógica para exibir alguma mensagem de erro
      });
  }

  navigateToRegister() {
    // Implemente a lógica para redirecionar para a página de registro
    this.router.navigateByUrl('/register'); // Substitua '/register' pelo caminho da sua página de registro
  }  
}



