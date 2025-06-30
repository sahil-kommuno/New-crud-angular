import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // private postapiUrl = 'http://localhost:6002/postdata';
  // private getapiUrl = 'http://localhost:6002/getdata';

  // constructor(private router: Router, private http: HttpClient) {}
  // res_data: any = '';
  // getformdata() {
  //   this.http.get(this.getapiUrl).subscribe({
  //     next: (Response) => {
  //       this.res_data = Response;
  //       console.log(Response);
  //     },
  //     error: (error) => {
  //       console.error('GET error:', error);
  //     },
  //   });
  // }
  // ngOnInit() {
  //   this.getformdata();
  //   setInterval(() => {
  //     this.res_data = [...this.res_data];
  //   }, 60000);
  // } 
  // getTimeAgo(date: string): string {
  //   const createdAt = new Date(date);
  //   const now = new Date();
  //   const diffMs = now.getTime() - createdAt.getTime();

  //   const seconds = Math.floor(diffMs / 1000);
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);

  //   if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  //   if (hours > 0) return `${hours} h${hours > 1 ? 's' : ''} ago`;
  //   if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
  //   return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  // }

  // deleteUser(id: string) {
  //   this.http.delete(`http://localhost:6002/deletedata/${id}`).subscribe(() => {
  //     this.getformdata();
  //   });
  // }
  // editID = '';
  // editUser(data: any) {
  //   this.editID = data._id;
  //   this.formdata = {
  //     fullname: data.fullname,
  //     email: data.email,
  //     password: data.password,
  //   };
  // }
  // formdata = {
  //   fullname: '',
  //   email: '',
  //   password: '',
  // };

  // emailvalidate: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // validEmail(): boolean {
  //   if (!this.formdata.email) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Email is mandatory',
  //       text: 'Something went wrong!',
  //     });
  //     return false;
  //   } else if (!this.emailvalidate.test(this.formdata.email)) {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Email Invalid, please enter a valid email id',
  //       text: 'Something went wrong!',
  //     });
  //     return false;
  //   }
  //   return true;
  // }
  // onSubmit() {
  //   if (!this.validEmail()) {
  //     return;
  //   }
  //   if (!this.editID) {
  //     this.http.post(this.postapiUrl, this.formdata).subscribe({
  //       next: (response) => {
  //         console.log('POST successful:', response);
  //         Swal.fire('Registration Successfully Completed');
  //         this.formdata = {
  //           fullname: '',
  //           email: '',
  //           password: '',
  //         };
  //         this.getformdata();
  //       },
  //       error: (error) => {
  //         console.error('POST error:', error);
  //         Swal.fire({
  //           icon: 'error',
  //           title: 'Registration Failed',
  //           text: 'Could not register. Please try again later.',
  //         });
  //       },
  //     });
  //   } else {
  //     this.http
  //       .put(`http://localhost:6002/updatedata/${this.editID}`, this.formdata)
  //       .subscribe(() => {
  //          this.formdata = {
  //           fullname: '',
  //           email: '',
  //           password: '',
  //         };
  //         this.getformdata();
  //       });
  //   }
  // }
}
