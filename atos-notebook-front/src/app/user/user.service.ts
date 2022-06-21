import { Injectable } from '@angular/core';
import { Observable, throwError, observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './user';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {ResponseEntity} from './responseentity';
import { AuthService } from '../login/auth.service';
import { Iniciativa } from '../iniciativa/iniciativa';

@Injectable()
export class UserService {

  private urlEndPoint:string = 'http://localhost:8080/users';
  private urlEndPointInactivos:string ='http://localhost:8080/users/unactive'
  private urlEndPointDeactivated:string ='http://localhost:8080/users/deac'
  private urlEndPointAddIniciativa:string ='http://localhost:8080/users/iniciativa/add'
  private header=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) { }

  uploadPhoto(archivo: File, id: any) {
    let path = "http://localhost:8080/users/upload";

    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);
    return this.http.post(path, formData, {headers: this.header}).pipe(
      map((response:any) => response.user as User ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
    )

  }

  fileUpload(file: File){

    let path = "http://localhost:8080/upload"

    const body = new FormData();
    body.append("file", file);

    return this.http.post(path, body, {headers: this.header});
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.urlEndPoint,{headers:this.header});
  }
  getUsersUnActive(): Observable<User[]>{
    return this.http.get<User[]>(this.urlEndPointInactivos,{headers:this.header});
  }



  create(user: User): Observable<User>{
    return this.http.post(this.urlEndPoint, user, {headers:this.header}).pipe(
      map((response:any) => response.user as User ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.urlEndPoint}/${id}`,{headers:this.header}).pipe(
    catchError(e=>{
      this.router.navigate(['/users']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  find(id:number): Observable<User>{
    return this.http.get<User>(`${this.urlEndPoint}/${id}`,{headers:this.header})
  }


  update(user: User): Observable<User>{
    return this.http.put<User>(`${this.urlEndPoint}/${user.id}`, user, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  delete(user:User): Observable<User>{
    let payload=this.authService.getDataToken(this.authService.token);
    user.autorDAS=payload.name
    return this.http.put<User>(`${this.urlEndPointDeactivated}/${user.id}`, user, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  addIniciativa(user: User, id:number): Observable<User>{
    return this.http.put<User>(`${this.urlEndPointAddIniciativa}/${user.id}?idIniciativa=${id}`,id, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/users']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }


  /**
   * Recoge los usuarios de un profesor
   * @param idIniciativa
   * @returns Users
   */
   getUsersGestor(idIniciativa: number): Observable<User[]>{

    let path = this.urlEndPoint + /mentor/ + idIniciativa;

    return this.http.get<User[]>(path, {headers:this.header});
  }


  getNotaMedia(idUser: number): Observable<number> {

    let path = this.urlEndPoint + "/notamedia/" + idUser

    return this.http.get<number>(path, {headers: this.header});
  }

}
