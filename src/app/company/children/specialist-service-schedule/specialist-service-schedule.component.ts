import { Component, OnInit } from '@angular/core';
import { HelpMe } from 'src/app/_models/help-me';
import { Specialist } from 'src/app/_models/specialist';
import { DataService } from 'src/app/_services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Good } from 'src/app/_models/good';

@Component({
  selector: 'app-specialist-service-schedule',
  templateUrl: './specialist-service-schedule.component.html',
  styleUrls: ['./specialist-service-schedule.component.scss'],
})
export class SpecialistServiceScheduleComponent implements OnInit {
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
  dates: { n: number, isBusy: boolean, isToday: boolean, route: string }[] = [];
  specialistId: number;
  goodId: number;
  good: Good;
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
    this.specialistId = this.activatedRoute.snapshot.parent.params.specialistId;
    this.goodId = this.activatedRoute.snapshot.params.goodId;
    this.dataService.getGood(this.goodId)
      .subscribe(
        (g: Good) => {
          this.good = g;
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
      this.router.navigateByUrl('/specialist/' + this.specialistId + '/schedule/month'); // ??
    }
    this.getMonthData(this.monthNo);
    this.dataService.getGoodWorkdays(this.goodId, this.month.y, this.month.n)
      .subscribe(
        (data: number[]) => {
          this.workdays = data;
          this.dates = [];
          for (let i = 1; i <= this.month.lastDay; i++) {
            this.dates.push({
              n: i,
              isBusy: (this.workdays.indexOf(i) != -1),
              isToday: (i === this.currentDate.getDate() && this.monthNo === 0),
              route: HelpMe.stringDateFormParams(this.month.y, this.month.n, i)
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
    const companyId = this.activatedRoute.snapshot.parent.params.companyId;
    // tslint:disable-next-line:max-line-length
    this.router.navigateByUrl('/company/' + companyId + '/specialist/' + this.specialistId + '/' + this.goodId + '/' + HelpMe.stringDateFormParams(this.month.y, this.month.n, date));
  }

}
