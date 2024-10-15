import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// primeng
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CardModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router, private service: AuthService) { }

  onSubmit() {
    const email = this.userForm.value.email;
    const password = this.userForm.value.password;

    if (this.userForm.valid) {
      this.service.login(email!, password!).subscribe({
        next: (data) => {
          this.service.setToken(data.token);
          this.router.navigate(['home']);
        },
        error: (err) => {
          console.log('Login failed:', err);
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}

