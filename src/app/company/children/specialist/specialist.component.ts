import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Specialist } from 'src/app/models/specialist';
import { Workday } from 'src/app/models/workday';
import { HelpMe } from 'src/app/models/help-me';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss'],
})
export class SpecialistComponent implements OnInit {
  monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  beginSpaces = [];
  finalSpaces = [];
  month: { y: number, n: number, name: string, lastDay: number };
  dates: { n: number, isBusy: boolean, isToday: boolean }[] = [];
  id: number;
  specialist: Specialist;
  workdays: number[];
  monthNo: number;
  maxMonth: number;
  previousIsVisible = true;
  nextIsVisible = true;
  currentDate = new Date();
  currentDateString: string;
  minDate: string;
  maxDate: string;

  constructor(private dataService: DataService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.sId;
    this.dataService.getSpecialist(this.id)
      .subscribe(
        (s: Specialist) => {
          this.specialist = s;
        }
      );
    this.monthNo = 0;
    this.currentDate = new Date();
    this.maxMonth = 12 * 2 - this.currentDate.getMonth() - 1;
    this.currentDateString = HelpMe.dateToString(new Date());
    this.minDate = HelpMe.stringDateFormParams(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    this.maxDate = HelpMe.stringDateFormParams(this.currentDate.getFullYear() + 1, 12, 31);
    this.initMonth();
  }

  initMonth() {
    if (this.monthNo < -1 || this.monthNo > this.maxMonth) {
      this.monthNo = 0;
      this.router.navigateByUrl('/specialist/' + this.id + '/schedule/month');
    }
    this.getMonthData(this.monthNo);
    this.dataService.getWorkdays(this.id, this.month.y, this.month.n)
      .subscribe(
        (data: number[]) => {
          this.workdays = data;
          this.dates = [];
          for (let i = 1; i <= this.month.lastDay; i++) {
            this.dates.push({
              n: i,
              isBusy: (this.workdays.indexOf(i) != -1),
              isToday: (i === this.currentDate.getDate() && this.monthNo === 0)
            });
          }
        }
      );
  }

  getMonthData(month: number) {
    const currentDate = new Date();
    const firstDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() * 1 + month * 1, 1, 0, 0, 0, 0);
    const lastDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth() * 1 + month * 1 + 1, 0, 0, 0, 0, 0);
    const firstDayWeekday = (firstDayDate.getDay() == 0) ? 7 : firstDayDate.getDay();
    const lastDayWeekday = (lastDayDate.getDay() == 0) ? 7 : lastDayDate.getDay();
    const lastDay = lastDayDate.getDate();
    this.month = {
      y: firstDayDate.getFullYear(),
      n: firstDayDate.getMonth() * 1 + 1 * 1,
      name: this.monthNames[firstDayDate.getMonth()],
      lastDay
    };
    this.beginSpaces = [];
    for (let i = 1; i < firstDayWeekday; i++) {
      this.beginSpaces.push(0);
    }
    this.finalSpaces = [];
    for (let i = 1; i <= 7 - lastDayWeekday; i++) {
      this.finalSpaces.push(0);
    }
  }
  previous() {
    this.monthNo--;
    this.initMonth();
    this.previousIsVisible = !(this.monthNo === -1);
    this.nextIsVisible = !(this.monthNo === this.maxMonth);
  }

  next() {
    this.monthNo++;
    this.initMonth();
    this.previousIsVisible = !(this.monthNo === -1);
    this.nextIsVisible = !(this.monthNo === this.maxMonth);
  }

  openDate(date) {
    const cId = this.activatedRoute.snapshot.parent.params.cId;
    this.router.navigateByUrl('/company/' + cId + '/' + this.id + '/' + HelpMe.stringDateFormParams(this.month.y, this.month.n, date));
  }

}
