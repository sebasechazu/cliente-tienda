import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
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
          this.service.setToken(data.token); // Guarda el token en localStorage
          console.log('Login successful:', data);
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

