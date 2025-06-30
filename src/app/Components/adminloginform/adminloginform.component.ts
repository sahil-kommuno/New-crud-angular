import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminloginform',
  templateUrl: './adminloginform.component.html',
  styleUrls: ['./adminloginform.component.css'],
})
export class AdminloginformComponent {
  logindata = {
    email: '',
    password: '',
  };

  emailvalidate: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private http: HttpClient, private router: Router) {}

  validEmail(): boolean {
    if (!this.logindata.email) {
      Swal.fire({
        icon: 'error',
        title: 'Email is mandatory',
        text: 'Something went wrong!',
      });
      return false;
    } else if (!this.emailvalidate.test(this.logindata.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email Invalid, please enter a valid email id',
        text: 'Something went wrong!',
      });
      return false;
    }
    return true;
  }

  onloginSubmit() {
    if (!this.validEmail()) {
      return;
    } else if (!this.logindata.password) {
      Swal.fire({
        icon: 'error',
        title: 'Password is mandatory',
        text: 'Please enter your password!',
      });
      return;
    }

    this.http
      .post<{ token: string; payload: any }>(
        'http://localhost:6002/adminlogin',
        this.logindata
      )
      .subscribe({
        next: (response) => {
          const token = response.token;
          const payload = response.payload;

          if (token) {
            localStorage.setItem('loginToken', token);
            localStorage.setItem('loginPayload', JSON.stringify(payload));
            console.log('Payload', payload);
            Swal.fire('Login Successful').then(() => {
              this.router.navigate(['/']);
            });
          } else {
            Swal.fire('Login Failed: No token received');
          }
        },
        error: (err) => {
          console.error('Login error:', err);
          Swal.fire(
            'Login Failed',
            'An error occurred while logging in.',
            'error'
          );
        },
      });
  }
}
