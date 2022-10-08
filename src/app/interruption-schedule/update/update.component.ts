import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../utils/notification.service';
import { ScheduleService } from '../service/schedule.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent implements OnInit {
  scheduleForm!: FormGroup;
  scheduleId: number;
  startDateMin: string;
  endDateMin: string;

  constructor(
    private formBuilder: FormBuilder,
    private notificationUtils: NotificationService,
    private scheduleService: ScheduleService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.startDateMin = this.formatDate(new Date());
    this.endDateMin = this.formatDate(new Date());
    this.scheduleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  formatDate(date: Date): string {
    return formatDate(new Date(date), 'yyyy-MM-ddTHH:mm', 'en-US');
  }

  ngOnInit(): void {
    this.createForm();
    this.loadSchedule();
  }

  /**
   * Create update form
   */
  createForm() {
    this.scheduleForm = this.formBuilder.group({
      description: [null, [Validators.required]],
      startDateTime: [null, [Validators.required]],
      endDateTime: [null, [Validators.required]],
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
   * Field validation method
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

  /**
   * Search schedule api and load data in to update form
   * @returns
   */
  loadSchedule() {
    if (!this.scheduleId) {
      this.notificationUtils.infoMessage('Schedule id not found.');
      return;
    }
    const subscription = this.scheduleService
      .getScheduleById(this.scheduleId)
      .subscribe({
        next: (data) => {
          this.scheduleForm.patchValue({
            description: data.data.description,
            startDateTime: data.data.startDateTime,
            endDateTime: data.data.endDateTime,
          });
          subscription.unsubscribe();
        },
        error: (error) => {
          this.notificationUtils.errorMessage(
            `Error loading data ${error.message}`
          );
          subscription.unsubscribe();
        },
      });
  }

  /**
   * Call update api to update data
   * @returns
   */
  updateSchedule() {
    if (this.scheduleForm.invalid) {
      this.scheduleForm.markAllAsTouched();
      return;
    }
    this.notificationUtils
      .confirmationMessage('This will update interruption schedule')
      .then((data) => {
        if (data.isConfirmed) {
          const subscription = this.scheduleService
            .updateSchedule(this.scheduleForm.value, this.scheduleId)
            .subscribe({
              next: () => {
                this.notificationUtils.successMessage(
                  'Schedule updated successfully.'
                );
                this.router.navigateByUrl('/interruption-schedule/view');
                subscription.unsubscribe();
              },
              error: (error) => {
                this.notificationUtils.errorMessage(
                  `Error updating schedule ${error.message}`
                );
                subscription.unsubscribe();
              },
            });
        }
      });
  }

  /**
   * Reset form
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
