import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
})
export class ListServicesComponent implements OnInit {
  services: Service[] = [];
  errorMessage: string = ''; // Para manejar los errores

  constructor(private serviceService: ServiceService) {}

  ngOnInit(): void {
    this.serviceService.servicesSubject$.subscribe((services) => {
      if (services) {
        this.services = services;
      }
    });

    if (this.services.length === 0) {
      this.serviceService.getServices().subscribe({
        error: (err) => {
          console.error('Error al obtener los servicios:', err);
          this.errorMessage =
            'Hubo un error al cargar los servicios. Intenta nuevamente.';
        },
      });
    }
  }

  deleteService(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.serviceService.deleteService(id).subscribe({
        next: () => {
          this.services = this.services.filter((service) => service._id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar el servicio:', err);
          this.errorMessage =
            'Hubo un error al eliminar el servicio. Intenta nuevamente.';
        },
      });
    }
  }
}
