import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SessionService } from '../../utils/session.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../utils/notification.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  @Output()
  sideBarToggleEvent = new EventEmitter<any>();

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private notificationUtils: NotificationService
  ) {}

  ngOnInit(): void {}

  toggle() {
    this.sideBarToggleEvent.next(true);
  }

  /**
   * user logout from the system 
   * clear session and navigate to login
   */
  logout() {
    this.notificationUtils
      .confirmationMessage('This will logout you from the system.')
      .then((data) => {
        if (data.isConfirmed) {
          this.sessionService.clear();
          this.router.navigateByUrl('/auth/login');
        }
      });
  }
}
