import { Component, OnInit } from '@angular/core';
import { IMenuItem } from '../_models/menu-item';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  menu: Set<IMenuItem> = new Set<IMenuItem>();
  constructor() {
    console.log('HomePage');
  }

  ngOnInit() {
    this.menu
      .add({ link: '/home/specs', title: 'Выбор специалиста' })
      .add({ link: '/home/support', title: 'Техническая поддержка' });
  }
}
