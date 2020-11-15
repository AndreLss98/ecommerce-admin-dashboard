import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]]
    })
  }

  ngOnInit(): void {

  }

  onLogin() {
    this.loginService.login(this.loginForm.value).subscribe((response) => {
      sessionStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/creditos'], { replaceUrl: true });
    }, (error) => {
      console.log('Auth error: ', error);
      sessionStorage.removeItem('user');
    }, () => {
    
    });
  }

}
