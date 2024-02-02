import { Component, QueryList, ViewChildren, OnInit, ElementRef } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router
import Swiper from 'swiper';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit{
  @ViewChildren('galleryImage') images!: QueryList<ElementRef>;
  currentImageIndex: number = 0;
  likes: number = 0;

  constructor(private router: Router) {}

  abrirLogin() {
    this.router.navigateByUrl('/login'); // Redireciona para a página de login
  }

ngOnInit(): void {
  const swiper = new Swiper('.swiper', {
    autoplay: {
      delay: 5000,
    },
   }); 
}

 
} 