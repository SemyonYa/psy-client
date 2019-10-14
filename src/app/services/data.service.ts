import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Specialist } from '../models/specialist';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getSpecialists() {
    return this.http.get(environment.host + '/specialist/all')
      .pipe(
        map(data => {
          const specs = data as any[];
          return specs.map(s => new Specialist());
        })
      );
  }
}
