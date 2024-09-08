import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Reservation } from '../models/reservation.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiUrl = `${environment.API_URL}/reservations`;
  private reservationsSubject$ = new BehaviorSubject<Reservation[]>([]);

  constructor(private http: HttpClient) {}
  getReservations(
    filters: {
      date?: string;
      serviceId?: string;
      userId?: string;
      status?: string;
    } = {}
  ): Observable<Reservation[]> {
    return this.http
      .get<Reservation[]>(this.apiUrl, {
        context: checkToken(),
        params: filters,
        responseType: 'json',
      })
      .pipe(
        tap((reservations) => {
          this.reservationsSubject$.next(reservations);
        })
      );
  }

  createReservation(reservation: {
    userId: string;
    serviceId: string;
    date: string;
    comments?: string;
  }): Observable<any> {
    return this.http
      .post<{ message: string; reservation: Reservation }>(
        this.apiUrl,
        reservation,
        {
          context: checkToken(),
        }
      )
      .pipe(
        tap((newReservation) => {
          const currentReservations = this.reservationsSubject$.getValue();
          this.reservationsSubject$.next([
            ...currentReservations,
            newReservation.reservation,
          ]);
        })
      );
  }

  updateReservation(
    id: string,
    updates: {
      userId?: string;
      serviceId?: string;
      date?: string;
      comments?: string;
      status?: string;
    }
  ): Observable<any> {
    return this.http
      .put<{ message: string; reservation: Reservation }>(
        `${this.apiUrl}/${id}`,
        updates,
        {
          context: checkToken(),
        }
      )
      .pipe(
        tap((updatedReservation) => {
          const currentReservations = this.reservationsSubject$.getValue();
          const updatedReservations = currentReservations.map((reservation) =>
            reservation._id === id
              ? updatedReservation.reservation
              : reservation
          );
          this.reservationsSubject$.next(updatedReservations);
        })
      );
  }

  deleteReservation(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { context: checkToken() })
      .pipe(
        tap(() => {
          const currentReservations = this.reservationsSubject$.getValue();
          this.reservationsSubject$.next(
            currentReservations.filter((reservation) => reservation._id !== id)
          );
        })
      );
  }

  getCurrentReservations(): Reservation[] {
    return this.reservationsSubject$.getValue();
  }
}
