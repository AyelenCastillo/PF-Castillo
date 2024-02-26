import { Component } from '@angular/core';

interface Post {
  imageUrl: string;
  description: string;
  likesCount: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  posts: Post[] = [
    { imageUrl: '../../../../../assets/img/Mesa de trabajo 4.png', 
      description: 'Moodboard, realizado por el alumno: Alejandro García en la clase de Photoshop & Ilustrator. El Moodboard en una collage de inspiración que se utiliza para la creación de marcas.',
      likesCount: 20 },
    { imageUrl: '../../../../../assets/img/IMG_20230529_143755(2).png', 
      description: 'Dibujo realizado por la alumna: Valentina Rodriguez en la clase de Dibujo Digital. Este trabajo fue destacado por el uso de los colores.', likesCount: 15 },
    { imageUrl: '../../../../../assets/img/Mesa de trabajo 9.png', 
      description: 'Trabajo realizador por el alumno: Sebastian Perez en la clase de Introdución al Diseño Grafico. Este trabajo fue destacado por la implementación de logo de marca en redes sociales ',
      likesCount: 10 },
    { imageUrl: '../../../../../assets/img/IMG_20230401_200126.jpg', 
      description: 'Dibujo realizado por el alumno: Juan Ramirez en la clase de Dibujo Digital. Este trabajo fue destacado por el uso de las sombras.', likesCount: 30 }
  ];


  paginaActual = 1;
  tamanoPagina = 2;

  cambiarPagina(event: any) {
    this.paginaActual = event.pageIndex + 1;
  }

  darLike(post: Post): void {
    post.likesCount++;
  }

  compartir(post: Post): void {
    console.log('Compartiendo...', post);
  }
}
