import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
})
export class CreateServiceComponent {
  service: Service = {
    _id: '',
    name: '',
    description: '',
    price: 0,
  };

  errorMessage: string = '';

  constructor(private serviceService: ServiceService, private router: Router) {}

  onSubmit() {
    this.serviceService.createService(this.service).subscribe({
      next: () => {
        this.resetForm();
        this.errorMessage = '';
        alert('¡Servicio creado exitosamente!');
      },
      error: (err) => {
        console.error('Error al crear servicio:', err);
        this.errorMessage =
          'Hubo un error al crear el servicio. Intenta de nuevo.';
      },
    });
  }

  private resetForm() {
    this.service = {
      _id: '',
      name: '',
      description: '',
      price: 0,
    };
  }
}
