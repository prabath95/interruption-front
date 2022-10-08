import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private ngxService: NgxUiLoaderService) {}

  showMainLoading() {
    this.ngxService.start();
  }

  hideMainLoading() {
    this.ngxService.stopAll();
  }

  successMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  errorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  warningMessage(message: string) {
    Swal.fire({
      icon: 'warning',
      title: 'Warning',
      text: message,
    });
  }

  infoMessage(message: string) {
    Swal.fire({
      icon: 'info',
      title: 'Info',
      text: message,
    });
  }

  confirmationMessage(message: string): Promise<any> {
    return Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
    });
  }
}
