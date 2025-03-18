import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Component, inject} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  imports: [CommonModule, FormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
  standalone: true
})
export class RegistroComponent {
  newUser: User = new User();
  errorMessage: string = '';
  successMessage: string = '';

  userService = inject(UserService);

  // Método para manejar el formulario de registro
  createUser() {
    if (this.newUser.name && this.newUser.age && this.newUser.email) {
      this.userService.createUser(this.newUser).subscribe({
        next: (user) => {
          console.log('Usuario creado:', user);
          this.successMessage = 'Usuario creado exitosamente!';
          this.errorMessage = '';
          // Limpiar el formulario
          this.newUser = new User();
        },
        error: (err) => {
          console.error('Error al crear usuario:', err);
          this.errorMessage = 'Hubo un problema al crear el usuario. Por favor intente de nuevo.';
          this.successMessage = '';
        }
      });
    } else {
      this.errorMessage = 'Todos los campos son obligatorios.';
      this.successMessage = '';
    }
  }
}