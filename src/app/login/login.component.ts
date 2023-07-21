import { Component, OnInit } from '@angular/core';
import { USERS, User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  isLoggedIn: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+@[a-z]+\.[a-z]/)]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^*()_+-={}|\";'?,./)])/)
      ])]
    });

    const storedUser = localStorage.getItem('userInfo');
    if (storedUser) {
      this.isLoggedIn = true;
    }
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if (this.validatePassword(email, password)) {
        const user = USERS.find(u => u.email === email && u.password === password);
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify({ email, password }));
          this.isLoggedIn = true;
          this.router.navigate(['/home']);
        }
        else {
          this.loginError = 'Email or password is incorrect';
        }
      }else{
        this.loginError = 'Passwword Not contain the username that exceed two consecutive characters.';
      }
    }
  }
  validatePassword(email: string, password: string) {
    const index = email.indexOf('@');
    const username = email.substring(0, index);
    for (let i = 0; i < password.length - 1; i++) {
      const pass = password.substring(i, i + 2);
      if (username.includes(pass)) {
        return false;
      }
    }
    return true;
  }
}