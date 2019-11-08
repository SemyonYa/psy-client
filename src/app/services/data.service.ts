import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { Specialist } from '../models/specialist';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  companies = new BehaviorSubject<Company[]>([]);
  constructor(private http: HttpClient, private router: Router) { }

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

  getWorkdays(specialistId: number, y: number, m: number) {
    return this.http.get(environment.host + '/client/workdays?spec_id=' + specialistId + '&year=' + y + '&month=' + m);
  }

  getSeances(specialistId: number, date: string) {
    return this.http.get(environment.host + '/client/seances?spec_id=' + specialistId + '&date=' + date);
  }
}
