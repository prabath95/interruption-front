import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ScheduleService } from './service/schedule.service';
import { NotificationService } from '../utils/notification.service';
import { Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { appConfig } from 'src/environments/environment';

@Component({
  selector: 'app-interruption-schedule',
  templateUrl: './interruption-schedule.component.html',
  styleUrls: ['./interruption-schedule.component.scss'],
})
export class InterruptionScheduleComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'scheduleId',
    'description',
    'interruptionStart',
    'interruptionEnd',
    'createdUser',
    'createdDate',
    'actions',
  ];
  dataSource!: MatTableDataSource<any>;
  private stompClient: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private scheduleService: ScheduleService,
    private notificationUtils: NotificationService,
    private router: Router
  ) {}

  /**
   * Remove socket on component destroy
   */
  ngOnDestroy(): void {
    this.disconnect();
  }

  /**
   * load data and create socket on module loading
   */
  ngOnInit(): void {
    this.getSchedules();
    this.connect();
  }

  /**
   * Get all schedule data
   */
  getSchedules() {
    const subscription = this.scheduleService.getAllSchedules().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource(data.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        subscription.unsubscribe();
      },
      error: (error) => {
        this.notificationUtils.errorMessage(
          `Error loading schedules ${error.message}`
        );
        subscription.unsubscribe();
      },
    });
  }

  /**
   * Schedule filleter method
   * @param event
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /**
   * Navigate to create schedule
   */
  createSchedule() {
    this.router.navigateByUrl('interruption-schedule/create');
  }

  /**
   * Navigate to update schedule route
   * @param row
   */
  updateSchedule(row: any) {
    this.router.navigate([
      'interruption-schedule/update',
      { id: row.interruptionId },
    ]);
  }

  /**
   * Delete schedule
   * @param row
   */
  deleteSchedule(row: any) {
    this.notificationUtils
      .confirmationMessage('This will delete interruption schedule')
      .then((data) => {
        if (data.isConfirmed) {
          const subscription = this.scheduleService
            .deleteScheduleById(row.interruptionId)
            .subscribe({
              next: () => {
                this.notificationUtils.successMessage(
                  'Schedule deleted successfully.'
                );
                this.getSchedules();
                subscription.unsubscribe();
              },
              error: (error) => {
                this.notificationUtils.errorMessage(
                  `Error deleting schedule ${error.message}`
                );
                subscription.unsubscribe();
              },
            });
        }
      });
  }

  /**
   * Socket connection for realtime schedule update
   */
  connect() {
    const socket = new SockJS(`${appConfig.appRoot}topic`);
    this.stompClient = Stomp.over(socket);
    const scope = this;
    this.stompClient.connect({}, (frame: any) => {
      scope.stompClient.subscribe('/topic/updateSchedule', (message: any) => {
        this.getSchedules();
      });
    });
  }

  /**
   * Socket disconnection
   */
  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }
  }
}
