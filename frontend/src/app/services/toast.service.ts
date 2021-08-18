import {Injectable} from '@angular/core';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
      toast.addEventListener('click', Swal.clickConfirm)
    }
  })

  constructor() {
  }

  success(msg: string, timer: number = 3000) {
    this.Toast.fire({
      icon: 'success',
      text: msg,
      timer: timer
    })
  }
  error(msg: string, timer: number = 3000) {
    this.Toast.fire({
      icon: 'error',
      text: msg,
      timer: timer
    })
  }
  warning(msg: string, timer: number = 3000) {
    this.Toast.fire({
      icon: 'warning',
      text: msg,
      timer: timer,
      showClass: {
        popup: 'animate__animated animate__bounceInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
  }
  info(msg: string, timer: number = 3000) {
    this.Toast.fire({
      icon: 'warning',
      text: msg,
      timer: timer
    })
  }
}
