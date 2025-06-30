import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormdataService } from 'src/app/Services/formdata.service';
import { HttpmethodsService } from 'src/app/interceptors/httpmethods.service';
@Component({
  selector: 'app-registerform',
  templateUrl: './registerform.component.html',
  styleUrls: ['./registerform.component.css'],
})
export class RegisterformComponent implements OnInit, OnDestroy {
  private editID: string | null = null;

  formdata = {
    fullname: '',
    email: '',
    password: '',
  };

  constructor(
    private router: Router,
    private http: HttpClient,
    private FormdataService: FormdataService,
    private HttpmethodsService: HttpmethodsService
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('loginToken');
    if (!token) {
      Swal.fire('Login first');
      this.router.navigate(['/adminloginform']);
    }
    const userdata = this.FormdataService.getUserdata();
    if (userdata) {
      this.formdata = {
        fullname: userdata.fullname,
        email: userdata.email,
        password: userdata.password,
      };
      this.editID = userdata.id;
    }
    this.FormdataService.clearEditMode();
  }
  ngOnDestroy(): void {
    if (!this.FormdataService.isInEditMode()) {
      this.FormdataService.clearUserdata();
    }
  }
  selectedFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
  validEmail(): boolean {
    if (!this.formdata.email) {
      Swal.fire({
        icon: 'error',
        title: 'Email is mandatory',
        text: 'Something went wrong!',
      });
      return false;
    } else if (!this.emailvalidate.test(this.formdata.email)) {
      Swal.fire({
        icon: 'error',
        title: 'Email Invalid, please enter a valid email id',
        text: 'Something went wrong!',
      });
      return false;
    }
    return true;
  }

  emailvalidate: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  onSubmit() {
    if (!this.validEmail()) {
      return;
    }
    const payload = new FormData();
    payload.append('fullname', this.formdata.fullname);
    payload.append('email', this.formdata.email);
    payload.append('password', this.formdata.password);
    if (this.selectedFile) {
      payload.append('image', this.selectedFile);
    }

    if (this.editID) {
      this.HttpmethodsService.putApi(this.editID, payload).subscribe({
        next: () => {
          Swal.fire('User Updated Successfully').then(() => {
            this.FormdataService.clearUserdata();
            this.router.navigate(['/']);
          });
        },
        error: (error) => {
          console.error('PUT error:', error);
          Swal.fire('Failed to update user');
        },
      });
    } else {
      this.HttpmethodsService.postApi(payload).subscribe({
        next: () => {
          Swal.fire('Registration Successful').then(() => {
            this.router.navigate(['/']);
          });
        },
        // error: (error) => {
        //   console.error('POST error:', error);
        //   Swal.fire('Failed to register user');
        // },
      });
    }
  }
}
