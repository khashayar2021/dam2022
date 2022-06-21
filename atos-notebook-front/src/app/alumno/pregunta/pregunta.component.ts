import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from '../../notebook/topic/question/question.service';
import { Question } from '../../notebook/topic/question/question';
import { MenuItem } from 'primeng/api';
import { Answer } from '../../notebook/topic/answer/answer';
import { AnswerService } from '../../notebook/topic/answer/answer.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pregunta',
  templateUrl: './pregunta.component.html',
  styleUrls: ['./pregunta.component.css']
})
export class PreguntaComponent implements OnInit {

  preguntaId!: number;
  question: Question = new Question;
  items2: MenuItem[] =[];
  answer: Answer = new Answer();

  archivo!: File;

  errores:string[]=[];
  jwt: JwtHelperService = new JwtHelperService();

  constructor(private formBuilder: FormBuilder, private questionService: QuestionService, private answerService: AnswerService, private router:Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPregunta();
    this.getAnswer();
    this.answer = new Answer();




  }


   formulario: FormGroup = this.formBuilder.group({
    respuesta: [, [ Validators.required] ]
  })

  update() {

    this.answerService.update(this.answer).subscribe({
      next: resp => {
        Swal.fire('Respuesta modificada', 'Su respuesta fue modificada con éxito', 'success')
      }
    })

  }

  getAnswer() {

    if (this.preguntaId) {

      this.answerService.getAnswerByQuestion(this.preguntaId, this.findIdUser()).subscribe({
        next: resp => {
          this.answer = resp

          console.log(this.answer);

        }
      })
    }
  }

  findIdUser():number {

    return this.jwt.decodeToken(sessionStorage.getItem('token')!).id;
  }

  capturarFile(event: any): any {

    const archivoCapturado = event.target.files[0]

    this.archivo = archivoCapturado

  }

  enviarArchivo() {

    this.getAnswer();

    if (this.answer != null) {
      console.log(this.answer);

      this.answerService.delete(this.answer.id!).subscribe({
        next: resp => {
          console.log("Borrado respuesta " + this.answer.id);

        }
      })
    }


    this.answerService.fileUpload(this.archivo, this.question.id, this.findIdUser()).subscribe({
      next: resp => {

        Swal.fire('Enviado', 'El archivo fue recibido correctamente', 'success');
      }
    })

  }

  enviarRespuesta(): void {
    let body: Answer
    if (this.answer != null) {
      body = {
      "id": this.answer.id,
      "answer": this.formulario.value.respuesta
    }
  }
  else {
    body = {
      "answer": this.formulario.value.respuesta
    }
  }

    this.answerService.create(body).subscribe({

      next: resp => {

        this.answerService.insert(resp, this.findIdUser(), this.question.id).subscribe({
          next: resp2 => {

          }
        })

        Swal.fire('Respuesta enviada', 'Su respuesta fué enviada con éxito', 'success')
      }, error: err => {

        this.errores = err.error.errors as string[];
        console.error(err.error.errors);

      }
    })
  }

  getPregunta(): void{
    this.activatedRoute.params.subscribe(params => {
      this.preguntaId = params['id']

      if (this.preguntaId) {
        this.questionService.getQuestion(this.preguntaId).subscribe({
          next: resp => {
            this.question = resp;

          }
        } )
      }

      })
    }

}
