import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Service } from '../models/service.model';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { checkToken } from '../interceptors/token.interceptor';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  apiUrl = environment.API_URL + '/services';
  servicesSubject$ = new BehaviorSubject<Service[]>([]);

  constructor(private http: HttpClient) {}

  getServices(): Observable<Service[]> {
    return this.http
      .get<Service[]>(this.apiUrl, { context: checkToken() })
      .pipe(
        tap((services) => {
          this.servicesSubject$.next(services);
        })
      );
  }

  createService(service: {
    name: string;
    description: string;
    price: number;
  }): Observable<any> {
    return this.http
      .post<{ message: string; service: Service }>(`${this.apiUrl}`, service, {
        context: checkToken(),
      })
      .pipe(
        tap((newService) => {
          const currentServices = this.servicesSubject$.getValue();
          this.servicesSubject$.next([...currentServices, newService.service]);
        })
      );
  }

  getCurrentServices(): Service[] {
    return this.servicesSubject$.getValue();
  }

  deleteService(id: string): Observable<any> {
    return this.http
      .delete(`${this.apiUrl}/${id}`, { context: checkToken() })
      .pipe(
        tap(() => {
          const currentServices = this.servicesSubject$.getValue();
          this.servicesSubject$.next(
            currentServices.filter((service) => service._id !== id)
          );
        })
      );
  }
}
