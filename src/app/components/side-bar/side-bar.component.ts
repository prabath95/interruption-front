import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';

export interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent implements OnInit {
  @ViewChild('drawer', { static: false })
  private drawer!: MatDrawer;

  panelOpenState: boolean = false;
  menu: NavItem[] = [
    {
      displayName: 'Schedules',
      iconName: 'calendar_month',
      route: 'interruption-schedule',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggle() {
    this.drawer.toggle();
  }
  navigate(item: any) {
    this.router.navigateByUrl(item.route);
  }
}
