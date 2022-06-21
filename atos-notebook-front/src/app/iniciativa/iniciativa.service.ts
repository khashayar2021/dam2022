import { Injectable } from '@angular/core';
import {Observable,throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Iniciativa } from './iniciativa';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { User } from '../user/user';

@Injectable()
export class IniciativaService {
  private urlEndPoint:string = 'http://localhost:8080/iniciativas';
  private urlEndPointInactivos:string ='http://localhost:8080/iniciativas/inactive'
  private urlEndPointDeactivated:string ='http://localhost:8080/iniciativas/deactivated'
  private urlEndPointNotIn:string ='http://localhost:8080/iniciativas/listByNotUser'
  private urlEndPointNotebookAdd:string='http://localhost:8080/notebooks/iniciativa/add'

  private header=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  constructor(private http: HttpClient, private router: Router,private authService: AuthService) { }


  getIniciativas(): Observable<Iniciativa[]>{
    return this.http.get<Iniciativa[]>(this.urlEndPoint, {headers: this.header});
  }

  /**
   * Iniciativas Inactivas
   * @returns
   */
  getIniciativasInactive(): Observable<Iniciativa[]>{
    return this.http.get<Iniciativa[]>(this.urlEndPointInactivos, {headers: this.header});
  }

  /**
   * Coge las iniciativas que no tiene un usuario
   * @param id
   * @returns
   */
  getIniciativasNotInUser(id: number): Observable<Iniciativa[]>{
    return this.http.get<Iniciativa[]>(`${this.urlEndPointNotIn}/${id}`, {headers: this.header});
  }

  /**
   * Crea una iniciativa
   * @param iniciativa
   * @returns
   */
  create(iniciativa: Iniciativa): Observable<Iniciativa>{
    return this.http.post(this.urlEndPoint, iniciativa, {headers: this.header}).pipe(
      map((response:any) => response.iniciativa as Iniciativa ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/iniciativas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

/**
 * Coge una iniciativa en concreto
 * @param id
 * @returns
 */
  getIniciativa(id: number): Observable<Iniciativa>{
    return this.http.get<Iniciativa>(`${this.urlEndPoint}/${id}`, {headers: this.header}).pipe(
    catchError(e=>{
      this.router.navigate(['/iniciativas']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  update(iniciativa: Iniciativa): Observable<Iniciativa>{
    return this.http.put<Iniciativa>(`${this.urlEndPoint}/${iniciativa.id}`, iniciativa, {headers: this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/iniciativas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  delete(iniciativa: Iniciativa): Observable<Iniciativa>{
    let payload=this.authService.getDataToken(this.authService.token);
    iniciativa.deactivatedBy=payload.name
    return this.http.put<Iniciativa>(`${this.urlEndPointDeactivated}/${iniciativa.id}`,iniciativa, {headers: this.header}).pipe(
      catchError(e=>{
        this.router.navigate(['/iniciativas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  /**
   * Añade un NoteBook a una iniciativa
   * @param iniciativa
   * @param id
   * @returns
   */
  addNotebook(iniciativa: Iniciativa, id:number): Observable<Iniciativa>{

    return this.http.put<Iniciativa>(`${this.urlEndPointNotebookAdd}/${iniciativa.id}?idNotebook=${id}`,id, {headers:this.header}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/iniciativas']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

/**
 * Recoge la iniciativa de un usuario
 * @param idUser
 * @returns
 */
  getIniciativaUser(idUser: number) {

    let path = this.urlEndPoint + "/user/" + idUser;

    return this.http.get<Iniciativa>(path, {headers: this.header});

  }

}
