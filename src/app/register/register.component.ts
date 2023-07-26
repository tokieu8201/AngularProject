import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;
  //user: User[] = [];
  error: string= '';
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ){}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/[a-zA-Z0-9]+@[a-z]+\.[a-z]/)]],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(12),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^*()_+-={}|\";'?,./)])/)
      ])]
    })
  }

  register(): void{
    if(this.registerForm.valid){
      const name = this.registerForm.value.name;
      const email = this.registerForm.value.email;
      const password = this.registerForm.value.password;
      if(this.validatePassword(email, password)){
        this.userService.register(name, email, password).subscribe(
          (user) => {
            this.router.navigate(['/login']);
          }
        )
      }
      else{
        this.error = 'Passwword not contain the username that exceed two consecutive characters';
      }
    }
    else{
      this.error = 'Please enter name, email and password'
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
