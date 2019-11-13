import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  write(data) {
    console.log('Log: ', (new Date()).toDateString(), data);
  }
}
