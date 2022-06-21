import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Answer } from './answer';
import { AnswerService } from './answer.service';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  answers: Answer[]=[];

  mostrar:boolean=false;
  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.answerService.getAnswers().subscribe({
      next:(answers)=>{
        this.answers=answers;
        this.mostrar=true;
      }

    }


    );

  }
}
