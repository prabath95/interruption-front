import { Component, OnInit, ViewChild } from '@angular/core';
import { SideBarComponent } from './side-bar/side-bar.component';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
})
export class ComponentsComponent implements OnInit {
  @ViewChild(SideBarComponent, { static: false })
  private sideBarComponent!: SideBarComponent;

  constructor() {}

  ngOnInit(): void {}

  toggle() {
    this.sideBarComponent.toggle();
  }
}
