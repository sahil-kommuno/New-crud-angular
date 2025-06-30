import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements DoCheck {
  constructor(private router: Router) {}

  loginbtn: string = 'Login';
  loginemail: string = '';

  ngDoCheck(): void {
    const token = localStorage.getItem('loginToken');

    if (token) {
      this.loginbtn = 'Logout';
    }

    if (this.loginbtn === 'Logout') {
      const payload = localStorage.getItem('loginPayload');
      if (payload) {
        const parsedPayload = JSON.parse(payload);
        this.loginemail = parsedPayload.email;
      }
    } else {
      this.loginemail = '';
    }
  }

  onloginbtn(): void {
    if (this.loginbtn === 'Login') {
      this.router.navigate(['/adminloginform']);
    } else if (this.loginbtn === 'Logout') {
      localStorage.removeItem('loginToken');
      localStorage.removeItem('loginPayload');
      this.loginbtn = 'Login';
      this.router.navigate(['/']);
    }
  }
}
