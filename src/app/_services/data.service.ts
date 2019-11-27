import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Specialist } from '../_models/specialist';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Company } from '../_models/company';
import { Good } from '../_models/good';
import { Seance } from '../_models/seance';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  companies = new BehaviorSubject<Company[]>([]);
  constructor(private http: HttpClient, private router: Router) { }
  goodSeancesState = new BehaviorSubject<boolean>(false);

  get(url, stringParams = ''): Observable<any> {
    return this.http.get(url)
      .pipe(
        catchError(
          err => {
            this.router.navigate(['/error']);
            console.log('err', err);
            return of(false);
          }
        ),
      );
  }

  post(url, formData: any): Observable<any> {
    return this.http.post(url, formData)
      .pipe(
        catchError(
          err => {
            this.router.navigateByUrl('/error');
            console.log('err', err);
            return of(false);
          }
        ),
      );
  }

  setGoodSeancesState(state: boolean) {
    this.goodSeancesState.next(state);
  }

  getCompanies() {
    this.http.get(environment.host + '/client/companies')
      .pipe(
        map(
          (data: any[]) => {
            // tslint:disable-next-line:max-line-length
            return data.map(c => new Company(c.id, c.organization_name, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus.'));
          }
        )
      ).subscribe(
        (data: Company[]) => {
          this.companies.next(data);
        }
      );
  }

  getCompany(id) {
    return this.http.get(environment.host + '/client/company?id=' + id)
      .pipe(
        map(
          (c: any) => {
            return new Company(c.id, c.organization_name, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus.');
          }
        )
      );
  }

  getSpecialists(companyId) {
    return this.http.get(environment.host + '/client/specialists?companyId=' + companyId)
      .pipe(
        map(data => {
          const specs = data as any[];
          return specs.map(s => new Specialist(s.id, s.name, s.description));
        })
      );
  }

  getSpecialist(id) {
    return this.http.get(environment.host + '/client/specialist?id=' + id)
      .pipe(
        map(
          (s: any) => {
            return new Specialist(s.id, s.name, s.description);
          })
      );
  }

  getGoods(specialistId) {
    return this.http.get(environment.host + '/client/goods?spec_id=' + specialistId)
      .pipe(
        map(
          (data: any[]) => data.map(g => new Good(g.id, g.name, g.description, g.price, g.duration, g.specialist_id, g.invisible))
        )
      );
  }

  getGood(id) {
    return this.http.get(environment.host + '/client/good?id=' + id)
      .pipe(
        map(
          (g: any) => new Good(g.id, g.name, g.description, g.price, g.duration, g.specialist_id, g.invisible)
        )
      );
  }

  getWorkdays(specialistId: number, y: number, m: number) {
    return this.http.get(environment.host + '/client/workdays?spec_id=' + specialistId + '&year=' + y + '&month=' + m);
  }

  getGoodWorkdays(goodId: number, y: number, m: number) {
    return this.http.get(environment.host + '/client/good-workdays?good_id=' + goodId + '&year=' + y + '&month=' + m);
  }

  getSeances(specialistId: number, date: string) {
    return this.http.get(environment.host + '/client/seances?spec_id=' + specialistId + '&date=' + date)
      .pipe(
        map(
          (data: any[]) => data.map(s => new Seance(s.id, s.date, s.time, s.duration, s.price, s.status, s.good_id))
        )
      );
  }

  getGoodSeances(goodId: number, date: string) {
    return this.http.get(environment.host + '/client/good-seances?good_id=' + goodId + '&date=' + date)
      .pipe(
        map(
          (data: any[]) => data.map(s => new Seance(s.id, s.date, s.time, s.duration, s.price, s.status, s.good_id))
        )
      );
  }

  getSeance(id: number) {
    return this.http.get(environment.host + '/client/seance?id=' + id)
      .pipe(
        map(
          (s: any) => {
            return new Seance(s.id, s.date, s.time, s.duration, s.price, s.status, s.good_id, s.name);
          }
        )
      );
  }

  preBooking(formData) {
    return this.http.post(environment.host + '/client/pre-booking', formData);
  }

  booking(formData: any) {
    return this.http.post(environment.host + '/client/booking', formData);
  }
}
