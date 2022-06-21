import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Notebook } from 'src/app/notebook/notebook';
import { NotebookService } from 'src/app/notebook/notebook.service';
import { Answer } from 'src/app/notebook/topic/answer/answer';
import { AnswerService } from 'src/app/notebook/topic/answer/answer.service';
import { Question } from 'src/app/notebook/topic/question/question';
import { QuestionService } from 'src/app/notebook/topic/question/question.service';
import { KnobModule } from 'primeng/knob';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-notebookview',
  templateUrl: './notebookview.component.html',
  styleUrls: ['./notebookview.component.scss'],
})
export class NotebookviewComponent implements OnInit {
  notebooks: Notebook[] = [];
  questions: Question[] = [];
  answers: Answer[] = [];
  notebook!: Notebook;
  question!: Question;
  notebookId!: number;
  idUser!: number;
  value: number = 0;
  media = 0;
  mostrarNota: boolean = false;
  urlSafe: any[] = [];

  constructor(
    private questionService: QuestionService,
    private sanitizer: DomSanitizer,
    private answerService: AnswerService,
    private noteBookService: NotebookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getNotebook();

    this.getPreguntasNotebook();
  }

  setValue(newValue: any, answer2: Answer) {
    this.value = newValue;

    answer2.nota = this.value;

    this.answerService.updateRespuesta(answer2.id!, answer2).subscribe({
      next: (resp) => {
        console.log(resp);
      },
    });

    this.calcularMedia();
  }

  getPreguntasNotebook(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.notebookId = params['note'];
      this.idUser = params['id'];
      if (this.notebookId) {
        this.questionService
          .getNotebookQuestion(this.notebookId)
          .subscribe((question) => {
            this.questions = question;
            this.ordenarLista(this.questions);
            console.log(this.questions);

            this.getAnswers(this.questions);
            console.log(this.answers);
          });
      }
    });
  }

  ordenarLista(array: Question[]) {
    array.sort(function (a, b) {
      if (a.orden > b.orden) {
        return 1;
      }
      if (a.orden < b.orden) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });
  }

  getAnswers(listaPreguntas: Question[]) {
    for (let i = 0; i < listaPreguntas.length; i++) {
      this.answerService
        .getAnswerByQuestion(listaPreguntas[i].id, this.idUser)
        .subscribe({
          next: (resp) => {
            this.answers[i] = resp;

            this.urlSafe[i] =
              `data:image/png;base64` +
              this.sanitizer.bypassSecurityTrustUrl(this.answers[i].urlFile!);
          },
        });
    }
  }

  calcularMedia() {
    let contador = 0;
    this.media = 0;
    for (let i = 0; i < this.answers.length; i++) {
      if (this.answers[i] != null) {
        this.media = this.media + this.answers[i].nota!;
        contador++;
      } else {
      }
    }
    this.media = this.media / contador;
    this.media = Math.round(this.media);
    this.mostrarNota = true;

    this.noteBookService
      .insertNota(this.idUser, this.notebookId, this.media)
      .subscribe({
        next: (resp) => {},
      });
  }

  getNotebook(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['note'];
      if (id) {
        this.noteBookService
          .getNotebook(id)
          .subscribe((notebook) => (this.notebook = notebook));
      }
    });
  }
}
