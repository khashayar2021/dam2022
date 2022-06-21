import { Injectable } from '@angular/core';
import { map,catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {Observable,throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Answer } from './answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private urlEndPoint:string = 'http://localhost:8080/answers';

  constructor(private http: HttpClient, private router: Router) { }
  private httpHeaders=new HttpHeaders().set('Authorization', `Bearer ${sessionStorage.getItem('token')}` || '');

  fileUpload(file: File, idQuestion: number, idUser: number) {

    let path = "http://localhost:8080/answers/upload/" + idQuestion + "/" + idUser;

    const body2 = {

    }

    const body = new FormData();
    body.append("archivo", file);

    return this.http.post(path, body, {headers: this.httpHeaders});
  }

  /**
   * Coge todas las respuestas
   * @returns
   */
  getAnswers(): Observable<Answer[]>{
    return this.http.get<Answer[]>(this.urlEndPoint);
  }

  create2(answer: Answer): Observable<Answer> {
    console.log(answer);

    const body = {
      answer: answer.answer,
      question: answer.question,
      user: answer.user
    }

    return this.http.post<Answer>(this.urlEndPoint, answer, {headers: this.httpHeaders});
  }

  insert(answer: Answer, idUser: number, idPregunta: number): Observable<Answer> {

    let urlEndPointInsert:string = 'http://localhost:8080/answer';

    return this.http.put<Answer>(`${urlEndPointInsert}/${answer.id}?idUser=${idUser}&idPregunta=${idPregunta}`, answer, {headers: this.httpHeaders});
  }

  create(answer2: Answer): Observable<Answer>{

    const body = {
      id: answer2.id,
      answer: answer2.answer
    }

    return this.http.post(this.urlEndPoint, body, {headers: this.httpHeaders}).pipe(
      map((response:any) => response.answer as Answer ),
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/answer']);
        console.error(e.error.mensaje);
        Swal.fire('Error al crear',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  /**
   * Devuelve la respuesta de una pregunta de un usuario
   * @param id
   */
  getAnswerByQuestion(idPregunta: number, idUser: number): Observable<Answer> {

    let urlEndPointInsert:string = 'http://localhost:8080/answer';

    return this.http.get<Answer>(`${urlEndPointInsert}/${idPregunta}?idUser=${idUser}`).pipe(
      catchError(e=>{
        this.router.navigate(['/answer']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  updateRespuesta(idRespuesta: number, answer: Answer): Observable<Answer> {

    return this.http.put<Answer>(`${this.urlEndPoint}/${idRespuesta}`, answer, {headers: this.httpHeaders} ).pipe(
      catchError(e=>{
        this.router.navigate(['/answer']);
        console.error(e.error.mensaje);
        Swal.fire('Error al editar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }

  getAnswer(id: String): Observable<Answer>{
    return this.http.get<Answer>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e=>{
      this.router.navigate(['/answer']);
      console.error(e.error.mensaje);
      Swal.fire('Error al editar',e.error.mensaje, 'error');
      return throwError(()=>e);
    })
    );
  }

  update(answer: Answer): Observable<Answer>{
    return this.http.put<Answer>(`${this.urlEndPoint}/${answer.id}`, answer, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        if(e.status==400){
          return throwError(()=>e);
        }
        this.router.navigate(['/answer']);
        console.error(e.error.mensaje);
        Swal.fire('Error al actualizar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }


  delete(id: number): Observable<Answer>{
    return this.http.delete<Answer>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e=>{
        this.router.navigate(['/answer']);
        console.error(e.error.mensaje);
        Swal.fire('Error al borrar',e.error.mensaje, 'error');
        return throwError(()=>e);
      })
      );
  }
}
