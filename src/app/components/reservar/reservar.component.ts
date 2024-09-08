import { Component } from '@angular/core';
import { Service } from 'src/app/models/service.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { ServiceService } from 'src/app/services/service.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
})
export class ReservarComponent {
  services: Service[] = [];
  selectedServiceId: string | null = null;
  reservationDate: string = '';
  comments: string = '';
  errorMessage: string = '';

  constructor(
    private serviceService: ServiceService,
    private reservationService: ReservationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.serviceService.servicesSubject$.subscribe((services) => {
      if (services) {
        this.services = services;
      }
    });

    if (this.services.length === 0) {
      this.serviceService.getServices().subscribe();
    }
  }

  reserve(): void {
    if (!this.selectedServiceId || !this.reservationDate) {
      this.errorMessage = 'Por favor, seleccione un servicio y una fecha.';
      return;
    }

    const userId = this.tokenService.getUserIdFromToken();

    if (!userId) {
      this.errorMessage = 'El usuario no está autenticado.';
      return;
    }

    const reservation = {
      userId: userId,
      serviceId: this.selectedServiceId,
      date: this.reservationDate,
      comments: this.comments,
    };

    this.reservationService.createReservation(reservation).subscribe({
      next: () => {
        this.selectedServiceId = null;
        this.reservationDate = '';
        this.comments = '';
        this.errorMessage = '';
        alert('¡Reserva creada exitosamente!');
      },
      error: (err) => {
        console.error('Error creando la reserva:', err);
        this.errorMessage =
          'Hubo un error al crear la reserva. Por favor, inténtelo nuevamente.';
      },
    });
  }
}
