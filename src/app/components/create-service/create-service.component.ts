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
    name: '',
    description: '',
    price: 0,
  };

  constructor(private serviceService: ServiceService, private router: Router) {}

  onSubmit() {
    this.serviceService.createService(this.service).subscribe({
      next: () => {
        this.resetForm();
      },
      error: (error) => {
        console.error('Error al crear el servicio', error);
      },
    });
  }

  private resetForm() {
    this.service = {
      name: '',
      description: '',
      price: 0,
    };
  }
}
