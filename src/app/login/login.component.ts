import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+@[a-z]+\.[a-z]/)]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^*()_+-={}|\";'?,./)])/)
      ])]
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const storedUser = localStorage.getItem('userInfo');
        this.isLoggedIn = !!storedUser;
      }
    });
    
    // const storedUser = localStorage.getItem('userInfo');
    // if (storedUser) {
    //   this.isLoggedIn = true;
    // }
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      if(this.validatePassword(email, password)){
        this.userService.getUsers().subscribe((users) => {
          const user = users.find((u) => u.email === email && u.password === password);
    
          if (user) {
            localStorage.setItem('userInfo', JSON.stringify({ email, password }));
            this.isLoggedIn = true;
            this.router.navigate(['/home']);
            
          } else {
            this.loginError = 'email or password is incorrect';
          }
        });
      }
      else{
        this.loginError = 'Passwword not contain the username that exceed two consecutive characters';
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
  validatePasswords(control: FormControl): ValidationErrors | null {
    const email = this.loginForm.value.email;
    const index = email.indexOf('@');
    const username = email.substring(0, index);
    const password = control.value;

    for (let i = 0; i < password.length - 1; i++) {
      const pass = password.substring(i, i + 2);
      if (username.includes(pass)) {
        return { passwordInvalid: true };
      }
    }

    return null;
  }
}
