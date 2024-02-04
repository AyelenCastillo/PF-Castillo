import { Injectable } from "@angular/core";
import { User } from "../users/models";
import { of } from "rxjs";


@Injectable()


export class UsersService {

   users: User[] = [
    {
        id: 1,
        firstName: "Alejandro",
        lastName: "García",
        email: "alejandro_garcia@example.com",
        password: "123456789",
        role: "Estudiante",
      },
      {
        id: 2,
        firstName: "Valentina",
        lastName: "Rodriguez",
        email: "valentina_rodriguez@example.com",
        password: "123456789",
        role: "Estudiante",
      },
      {
        id: 3,
        firstName: "Sebastian",
        lastName: "Perez",
        email: "sebastian_perez@example.com",
        password: "123456789",
        role: "Estudiante",
      },
      {
        id: 4,
        firstName: "Sophia",
        lastName: "Rodriguez",
        email: "sophia_rodriguez@example.com",
        password: "pass123",
        role: "Profesor",
      },
      {
        id: 5,
        firstName: "Daniel",
        lastName: "Hernandez",
        email: "daniel_hernandez@example.com",
        password: "d@ni3lP@ss",
        role: "Estudiante",
      },
      {
        id: 6,
        firstName: "Emily",
        lastName: "Johnson",
        email: "emily_johnson@example.com",
        password: "password123!",
        role: "Estudiante",
      },
      {
        id: 7,
        firstName: "Juan",
        lastName: "Ramirez",
        email: "juan_ramirez@example.com",
        password: "ju@nR@mir3z",
        role: "Profesor",
      },
      {
        id: 8,
        firstName: "Ava",
        lastName: "Taylor",
        email: "ava_taylor@example.com",
        password: "taylorAva567",
        role: "Estudiante",
      },
      {
        id: 9,
        firstName: "Eduardo",
        lastName: "Gomez",
        email: "eduardo_gomez@example.com",
        password: "edu1234",
        role: "Estudiante",
      },
      {
        id: 10,
        firstName: "Mia",
        lastName: "Martinez",
        email: "mia_martinez@example.com",
        password: "martinezMia",
        role: "Estudiante",
      },
  ];
  
    getUsers(){
        return of(this.users);
    }
}
