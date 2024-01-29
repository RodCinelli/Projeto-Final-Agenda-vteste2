import { Component, QueryList, ViewChildren, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router'; // Importar Router

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements AfterViewInit {
  @ViewChildren('galleryImage') images!: QueryList<ElementRef>;
  currentImageIndex: number = 0;
  likes: number = 0;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const imagesArray = this.images.toArray();
    imagesArray.forEach(image => (image.nativeElement.style.display = 'none'));
    if (imagesArray.length) {
      imagesArray[this.currentImageIndex].nativeElement.style.display = 'block';
    }
  }

  nextImage() {
    this.changeImage((this.currentImageIndex + 1) % this.images.length);
  }

  previousImage() {
    this.changeImage((this.currentImageIndex - 1 + this.images.length) % this.images.length);
  }

  showImage(index: number) {
    this.changeImage(index);
  }

  private changeImage(newIndex: number) {
    const imagesArray = this.images.toArray();
    imagesArray[this.currentImageIndex].nativeElement.style.display = 'none';
    this.currentImageIndex = newIndex;
    imagesArray[this.currentImageIndex].nativeElement.style.display = 'block';
  }

  abrirLogin() {
    this.router.navigateByUrl('/login'); // Redireciona para a página de login
  }
}
