import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { LoginComponent } from '../login/login.component';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { observable, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserToken } from '../user/user-token';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user:User;
  jwt:JwtHelperService = new JwtHelperService();
  loggedName!:String;
  logeado!:boolean;
  loggedRole!:String;
  constructor(private authService: AuthService, private router: Router,private userService: UserService, private activatedRoute: ActivatedRoute = new ActivatedRoute) {
    this.user=new User();
   }




  login(user:User){
      this.authService.login(user).subscribe( response => {
      console.log(response);

      this.authService.saveUser(response.jwt_token);
      this.authService.saveToken(response.jwt_token);

      let usuario = this.authService.getUser;

      this.router.navigate(['/']) // Definir la URL a donde se dirige

      Swal.fire('Login', `Has iniciado sesión esta ventana se cerrará automáticamente`, 'success')
      setTimeout(function(){
        window.location.reload();
     }, 1000);

    }, (err: { status: number; })  => {
      if (err.status == 500) Swal.fire('Error Login', 'Email or Password incorrect!', 'error')
    })

  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem("token"))
    this.logeado=this.logueado();
    if(sessionStorage.getItem("token") != null){
      this.loggedRole = this.jwt.decodeToken(sessionStorage.getItem('token')!).rol
    }

  }

  logueado():boolean{
    if (sessionStorage.getItem("token")!=null){
    let payload=this.authService.getDataToken(this.authService.token);
      this.loggedName=payload.name;
      return true;
    }
    return false;
  }


logout(): void{
  this.authService.logout()
  this.logeado=false;
  window.location.reload()
}

}
