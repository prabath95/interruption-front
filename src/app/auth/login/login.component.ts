import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/utils/notification.service';
import { SessionService } from 'src/app/utils/session.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private notificationUtils: NotificationService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  validateField(field: any) {
    return (
      (this.form[field].touched || this.form[field].disabled) &&
      this.form[field].enabled &&
      this.form[field].errors
    );
  }

  /**
   * User login and set token to session storage
   * @returns 
   */
  submit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    const subscription = this.authService
      .login(this.form['userName'].value, this.form['password'].value)
      .subscribe({
        next: (data) => {
          this.sessionService.setToken(data.data.token);
          this.router.navigateByUrl('interruption-schedule');
          subscription.unsubscribe();
        },
        error: () => {
          this.notificationUtils.errorMessage('Invalid user name or password.');
          subscription.unsubscribe();
        },
      });
  }
}
