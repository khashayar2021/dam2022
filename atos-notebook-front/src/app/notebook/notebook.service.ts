
import { Injectable } from '@angular/core';
import {Observable,throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Notebook } from './notebook';
import { map,catchError } from 'rxjs/operators';
import Swal from'sweetalert2';
import { Router } from '@angular/router';
@Injectable()
export class NotebookService {

  private urlEndPoint:string = 'http://localhost:8080/notebooks';
  private urlEndPointNotIn:string = 'http://localhost:8080/iniciativas/notebooks';
  private urlEndPointIn:string = 'http://localhost:8080/iniciativas/notebooksin';
  private urlEndPointNota:string = 'http://localhost:8080/users/nota';
  constructor(private http: HttpClient, private router: Router) { }
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  getNotebooks(): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(this.urlEndPoint);
  }

  getNotebooksNotIn(id:number): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(`${this.urlEndPointNotIn}/${id}`,{headers: this.httpHeaders});
  }

  getNotebooksIn(id:number): Observable<Notebook[]>{
    return this.http.get<Notebook[]>(`${this.urlEndPointIn}/${id}`,{headers: this.httpHeaders});
  }

  getNota(id:number, idNotebook:number):Observable<number>{
    return this.http.get<number>(`${this.urlEndPointNota}/${id}/${idNotebook}`,{headers: this.httpHeaders});
  }

  insertNota(idUser:number, idNotebook:number, nota:number): Observable<Number>{

    let path = this.urlEndPointNota + "/" + idUser + "/" + idNotebook + "?nota=" + nota

    return this.http.post<number>(path, idUser, {headers: this.httpHeaders});
  }


  createDos(notebook: Notebook): Observable<Notebook>{
    return this.http.post<Notebook>(this.urlEndPoint, notebook, {headers: this.httpHeaders});
  }

  create(notebook: Notebook): Observable<Notebook>{

    return this.http.post(this.urlEndPoint, notebook, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.notebook as Notebook ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/notebook/list']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  /**
   * Coge los notebooks
   */
  getNotebook(id: number): Observable<Notebook>{
    return this.http.get<Notebook>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e=>{
      this.router.navigate(['/notebooks']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  update(notebook: Notebook): Observable<Notebook>{
    return this.http.put<Notebook>(`${this.urlEndPoint}/${notebook.id}`,notebook, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/notebooks']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }



  delete(notebook: Notebook): Observable<Notebook>{
    return this.http.delete<Notebook>(`${this.urlEndPoint}/${notebook.id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        this.router.navigate(['/notebooks']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  clone(notebook: Notebook): Observable<Notebook> {

    let path = 'http://localhost:8080/notebooks/clone';

    const body = {
      title: notebook.title,
      description: notebook.description,
      content: notebook.content,
      iniciativa: notebook.iniciativa
    }


    return this.http.post<Notebook>(path, body, {headers: this.httpHeaders})
  }


  getNotebooksUsuario(id: number): Observable<Notebook[]> {

    let path = this.urlEndPoint + `/usuarios/${id}`

    return this.http.get<Notebook[]>(path ,{headers: this.httpHeaders});
  }



}
