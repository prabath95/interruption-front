import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotificationService } from '../../utils/notification.service';
import { ScheduleService } from '../service/schedule.service';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  scheduleForm!: FormGroup;
  startDateMin: string;
  endDateMin: string;

  constructor(
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationService,
    private scheduleService: ScheduleService,
    private router: Router
  ) {
    this.startDateMin = this.formatDate(new Date());
    this.endDateMin = this.formatDate(new Date());
  }

  formatDate(date: Date): string {
    return formatDate(new Date(date), 'yyyy-MM-ddTHH:mm', 'en-US');
  }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Create schedule form
   */
  createForm() {
    this.scheduleForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
      endDateTime: [{ value: null, disabled: true }, [Validators.required]],
    });
  }

  /**
   * change min date time value for end date
   */
  onStartDateTimeChange() {
    this.form['endDateTime'].enable();
    this.endDateMin = this.formatDate(this.form['startDateTime'].value);
  }

  get form() {
    return this.scheduleForm.controls;
  }

  /**
   * Validator for create schedule form
   * @param field
   * @returns
   */
  validateField(field: any) {
    return (
      (this.form[field].touched || this.form[field].disabled) &&
      this.form[field].enabled &&
      this.form[field].errors
    );
  }

  /***
   * Create schedule method
   */
  createSchedule() {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    this.notificationUtils
      .confirmationMessage('This will create interruption schedule')
      .then((data) => {
        if (data.isConfirmed) {
          const subscription = this.scheduleService
            .createSchedule(this.scheduleForm.value)
            .subscribe({
              next: () => {
                this.notificationUtils.successMessage(
                  'Schedule created successfully.'
                );
                this.router.navigateByUrl('/interruption-schedule/view');
                subscription.unsubscribe();
              },
              error: (error) => {
                this.notificationUtils.errorMessage(
                  `Error creating schedule ${error.message}`
                );
                subscription.unsubscribe();
              },
            });
        }
      });
  }

  /**
   * Form reset method
   */
  reset() {
    this.notificationUtils
      .confirmationMessage('This will reset form')
      .then((data) => {
        if (data.isConfirmed) {
          this.scheduleForm.reset();
        }
      });
  }
}
