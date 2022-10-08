import { Injectable } from '@angular/core';
import { HttpService } from '../../utils/http.service';
import { Observable } from 'rxjs';
import { appConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleService {
  constructor(private http: HttpService) {}

  /**
   * Get all schedules
   * @returns 
   */
  getAllSchedules(): Observable<any> {
    return this.http.get(`${appConfig.appRoot}interruption-schedule/all/`);
  }

  /**
   * Create schedule API
   * @param request 
   * @returns 
   */
  createSchedule(request: any): Observable<any> {
    return this.http.post(
      `${appConfig.appRoot}interruption-schedule/`,
      request
    );
  }

  /**
   * Update schedule API
   * @param request 
   * @param id 
   * @returns 
   */
  updateSchedule(request: any, id: number): Observable<any> {
    return this.http.put(
      `${appConfig.appRoot}interruption-schedule/${id}`,
      request
    );
  }

  /**
   * Search schedule from schedule id
   * @param id 
   * @returns 
   */
  getScheduleById(id: number): Observable<any> {
    return this.http.get(`${appConfig.appRoot}interruption-schedule/${id}`);
  }

  /**
   * Delete Schedule API
   * @param id 
   * @returns 
   */
  deleteScheduleById(id: number): Observable<any> {
    return this.http.delete(`${appConfig.appRoot}interruption-schedule/${id}`);
  }
}
