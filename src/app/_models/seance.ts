import { Time } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';

export class Seance {
    id: number;
    date: string; // Date;
    time: Time;
    duration: number;
    price: number;
    status: number;
    goodId: number;
    goodName: string;

    // tslint:disable-next-line:max-line-length
    constructor(id: string, date: string, time: string, duration: string, price: string, status: string, goodId: string, goodName: string = '') {
        this.id = Number.parseInt(id, 10);
        this.date = date;
        this.time = { hours: Number.parseInt(time.split(':')[0], 10), minutes: Number.parseInt(time.split(':')[1], 10) };
        this.duration = Number.parseInt(duration, 10);
        this.price = Number.parseInt(price, 10);
        this.status = Number.parseInt(status, 10);
        this.goodId = Number.parseInt(goodId, 10);
        this.goodName = goodName;
    }

    bookingForm(): FormGroup {
        return new FormGroup({
            seanceId: new FormControl(this.id, Validators.required),
            clientName: new FormControl('', [Validators.required, Validators.maxLength(30)]),
            clientPhone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[0-9\+]{10}$/)]),
            clientEmail: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.email]),
            clientWish: new FormControl('', Validators.maxLength(500)),
        });
    }
}
