import { Injectable } from '@angular/core';
import {Observable,throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Question } from './question';
import { Notebook } from '../../notebook';
@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private urlEndPoint:string = 'http://localhost:8080/questions';
  private urlEndPointId:string = 'http://localhost:8080/question/notebook';
  constructor(private http: HttpClient, private router: Router) { }
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  getQuestions(): Observable<Question[]>{
    return this.http.get<Question[]>(this.urlEndPoint);
  }

  getNotebookQuestion(id:number): Observable<Question[]>{
    return this.http.get<Question[]>(`${this.urlEndPointId}/${id}`, {headers: this.httpHeaders});
  }



  create(id:number,question :Question): Observable<Question>{
    return this.http.post(`${this.urlEndPointId}/${id}`, question, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.question as Question ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/preguntas/',id]);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  getQuestion(id: number): Observable<Question>{

    return this.http.get<Question>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e=>{
      this.router.navigate(['/questions']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  update(question: Question,idNotebook:number): Observable<Question>{
    console.log("dentro")
    return this.http.put<Question>(`${this.urlEndPoint}/${question.id}?idNotebook=${idNotebook}`, question, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/questions']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }


  delete(id: number): Observable<Question>{
    return this.http.delete<Question>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        this.router.navigate(['/questions']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }







}
