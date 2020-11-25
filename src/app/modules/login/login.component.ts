import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from './login.service';
import { checkPasswords } from 'src/app/shared/validators/confirm-password.validator';
import { MatDialog } from '@angular/material/dialog';
import { BasicModalComponent } from 'src/app/shared/modals/basic-modal/basic-modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public signUpForm: FormGroup;

  public isLoading: boolean = false;

  constructor(
    private router: Router,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
  ) {
    this.loginForm = formBuilder.group({
      Email: ['', [Validators.email, Validators.required]],
      Senha: ['', [Validators.minLength(6), Validators.required]]
    });

    this.signUpForm = formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      nome: ['', [Validators.minLength(2), Validators.required]],
      senha: ['', [Validators.minLength(6), Validators.required]],
      confirmaSenha: ['', [Validators.minLength(6), Validators.required]],
    }, { validators: checkPasswords });
  }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  onLogin() {
    this.isLoading = true;

    this.loginService.login(this.loginForm.value).subscribe((response) => {
      this.isLoading = false;
      sessionStorage.setItem('user', JSON.stringify(response));
      this.router.navigate(['/creditos'], { replaceUrl: true });

      this.loginService.silentRefresh = setInterval(() => {
        this.loginService.refreshSession()
        .subscribe(() => {
          sessionStorage.setItem('user', JSON.stringify(response));
        }, (error) => {
          clearInterval(this.loginService.silentRefresh);
        });
      }, response.ExpiresAt - 5000);

    }, ({ error }) => {
      this.matDialog.open(BasicModalComponent, { 
        data: { title: 'Aviso!', message: error.message }
      });
      console.log('Auth error: ', error);
      sessionStorage.removeItem('user');
      this.isLoading = false;
    }, () => {
      this.isLoading = false;
    });
  }

  onSignUp() {
    this.isLoading = true;
    this.loginService.signup({
      Nome: this.signUpForm.get('nome').value,
      Email: this.signUpForm.get('email').value,
      Senha: this.signUpForm.get('senha').value,
    }).subscribe((response) => {
      this.isLoading = false;
      this.matDialog.open(BasicModalComponent, {
        data: {
          title: "Aviso!",
          message: "Cadastro enviado com sucesso, aguarde sua aprovação."
        }
      }).afterClosed().subscribe(() => {
        this.signUpForm.reset({
          email: '',
          nome: '',
          senha: '',
          confirmaSenha: ''
        });
      });
    }, ({error}) => {
      console.log(error);
      this.isLoading = false;
      this.matDialog.open(BasicModalComponent, {
        data: {
          title: 'Aviso!',
          message: error.message
        }
      })
    }, () => {
      this.isLoading = false;
    });
  }

}
