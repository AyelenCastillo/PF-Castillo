import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { Cursos } from "./models";


@Injectable()


export class cursosService {

   cursos: Cursos[] = [
    {
        id: 1,
        name: "Photoshop & Ilustrator",
        hours: "12:00 - 16:00 hs",
        date: "Lunes & Miercoles",
        description: "Curso introductorio de las herramientas Adobe Photoshop & Ilistrator",
        price: "$100.000",
      },
      {
        id: 2,
        name: "Dibujo Digital ",
        hours: "12:00 - 16:00 hs",
        date: "Martes & Jueves",
        description: "Curso introductorio al Dibujo en entornos digitales, Técnicas de Dibujo y Coloración ",
        price: "$112.000",
      },
      {
        id: 3,
        name: "Introdución al Diseño Grafico",
        hours: "20:00 - 22:00 hs",
        date: "Lunes & Miercoles",
        description: "Curso introductorio donde se veran temas como: Forma, Formatos, Colores, etc",
        price: "$115.000",
      },
  ];
  
    getCursos(){
        return of(this.cursos);
    }
}
