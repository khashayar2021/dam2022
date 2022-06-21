import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user/user';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(): void {

    console.log(this.user);

    if (this.user.email == null || this.user.password == null) {
      Swal.fire('Error Login', 'Email o passwords empty');

      return;
    }



    this.authService.login(this.user).subscribe( response => {
      console.log(response);

      this.authService.saveUser(response.jwt_token);
      this.authService.saveToken(response.jwt_token);

      let usuario = this.authService.getUser;

      this.router.navigate(['/users']) // Definir la URL a donde se dirige
      Swal.fire('Login', `You have successfully logged in`, 'success')

    }, (err: { status: number; })  => {
      if (err.status == 500) Swal.fire('Error Login', 'Email or Password incorrect!', 'error')
    })

  }


}
