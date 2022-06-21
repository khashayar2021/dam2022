import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../login/auth.service';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  loggedName!:String;
  logeado!:boolean;
  user!:User;
  loggedRole!:String;
  jwt: JwtHelperService = new JwtHelperService()

  constructor(private authService: AuthService, private router: Router,private userService: UserService, private activatedRoute: ActivatedRoute = new ActivatedRoute) { }



  ngOnInit(): void {
    this.user=new User();

    this.loggedRole = this.jwt.decodeToken(sessionStorage.getItem('token')!).rol

  }


 logueado():boolean{
    if (sessionStorage.getItem("token")!=null){
    let payload=this.authService.getDataToken(this.authService.token);
      this.loggedName=payload.name;
      this.loggedRole=payload.rol;
      return true;
    }
    return false;
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

  logout(): void{
    this.authService.logout();
    this.logeado=false;
    window.location.reload();
  }

}
