import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  title:string = "";
  
  questions:any = "";
  questionSelected:any = "";

  answers:string[] = [];
  answerSelected:string = "";

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished: boolean = false;

  ngOnInit(): void {

    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionMaxIndex = this.questions.length
    }
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex += 1

    if(this.questionMaxIndex > this.questionIndex)
        this.questionSelected = this.questions[this.questionIndex]

    else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results]
    }
  }

  //verificar opção ganhadora.
  async checkResult(answers:string[]){
    const result = answers.reduce((previus, current, i, arr) =>{
      if(
        arr.filter(item => item === previus).length >
        arr.filter(item => item === current).length 
      ){
        return previus
      }else{
        return current
      }
    })
    return result
  }
  
}

