import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { FormdataService } from 'src/app/Services/formdata.service';
import { HttpmethodsService } from 'src/app/interceptors/httpmethods.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private getapiUrl = 'http://localhost:6002/getdata';

  private intervalId: any;
  constructor(
    private router: Router,
    private http: HttpClient,
    private HttpmethodsService: HttpmethodsService,
    private FormdataService: FormdataService
  ) {}
  formdata = {
    fullname: '',
    email: '',
    password: '',
  };
  searchformdata = {
    search: '',
    searchby: '',
  };
  // searchdata: any = '';
  onSearch() {
    const { search, searchby } = this.searchformdata;

    if (!search || !searchby) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Both fields are required!',
      });
      return;
    }

    const payload = { search, searchby };

    this.HttpmethodsService.searchApi(payload).subscribe({
      next: (response) => {
        this.res_data = response;
        console.log(response);
      },
      error: (error) => {
        console.error('Search error:', error);
      },
    });

    console.log(this.searchformdata);
  }

  res_data: any = '';
  getformdata() {
    this.HttpmethodsService.getApi().subscribe({
      next: (Response) => {
        this.res_data = Response;
        console.log(Response);
      },
      error: (error) => {
        console.error('GET error:', error);
      },
    });
  }
  ngOnInit() {
    this.getformdata();
    setInterval(() => {
      this.res_data = [...this.res_data];
    }, 60000);
  }
  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  getTimeAgo(date: string): string {
    const createdAt = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} h${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    return `${seconds} sec${seconds !== 1 ? 's' : ''} ago`;
  }
  deleteUser(id: string) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.HttpmethodsService.deleteApi(id).subscribe(
          () => {
            this.getformdata();
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            });
          },
          // (error) => {
          //   Swal.fire({
          //     title: 'Error!',
          //     text: 'Something went wrong, please try again.',
          //     icon: 'error',
          //   });
          // }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Cancelled',
          text: 'Your imaginary file is safe :)',
          icon: 'error',
        });
      }
    });
  }

  editUser(data: any) {
    this.FormdataService.sendUserdata({
      id: data._id,
      fullname: data.fullname,
      email: data.email,
      password: data.password,
    });
    this.router.navigate(['/regform']);
  }
}
