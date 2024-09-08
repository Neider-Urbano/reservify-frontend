import { Component } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
})
export class MyReservationsComponent {
  reservations: Reservation[] = [];

  constructor(
    private reservationService: ReservationService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    const userId = this.tokenService.getUserIdFromToken();

    if (userId) {
      this.reservationService.getReservations({ userId }).subscribe(
        (reservations) => {
          this.reservations = reservations;
        },
        (error) => {
          alert('Ocurrió un error al cargar las reservas.');
        }
      );
    } else {
      alert(
        'No se pudo cargar las reservas debido a un problema con el usuario.'
      );
    }
  }

  cancelReservation(id: string): void {
    if (confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      this.reservationService.deleteReservation(id).subscribe(
        () => {
          this.reservations = this.reservations.filter((r) => r._id !== id);
        },
        (error) => {
          alert('Ocurrió un error al cancelar la reserva.');
        }
      );
    }
  }

  editReservation(reservation: Reservation): void {
    console.log('Editando reserva', reservation);
  }
}
