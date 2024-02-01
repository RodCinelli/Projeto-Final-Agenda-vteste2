import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ModalController } from '@ionic/angular'; // Importe o ModalController
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-premium-modal',
  templateUrl: './premium-modal.page.html',
  styleUrls: ['./premium-modal.page.scss'],
})

export class PremiumModalPage implements OnInit {
  constructor(
    private authService: AuthService,
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
  }

  // Adicione a função upgradeToPremium
  async upgradeToPremium() {
    await this.authService.upgradeToPremium();
    this.modalController.dismiss();
    this.presentToast();
  }
  
  // Adicione a função goBack
  goBack() {
    this.modalController.dismiss();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Parabéns!! Agora você é um usuário Premium!',
      duration: 2000,
      color: 'success',
      position: 'top'
    });
    toast.present();
  }
}
