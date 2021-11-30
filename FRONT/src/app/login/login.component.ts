import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Form, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  accessForm!: FormGroup;
  loginDenied: boolean = false;

  constructor(
    private api: APIService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.accessForm = new FormGroup({
      login: new FormControl(null),
      senha: new FormControl(null),
    });
  }

  onSubmit(): void {
    this.login();
  }

  login(): void {
    this.api
      .getToken(
        this.accessForm.value.login,
        this.accessForm.value.senha
      )
      .subscribe((token) => {
        if (token) {
          this.api.setAuthorization(token);
          this.router.navigateByUrl('/kanban-board');
          this.loginDenied = false;
        } else {
          this.loginDenied = true;
          this.accessForm.reset();
          this.api.clearAuthorization();
        }
      });
  }

  logout(): void {
    this.router.navigateByUrl('/login');
    this.api.clearAuthorization();
  }
}
