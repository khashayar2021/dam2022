import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { IniciativaService } from '../../iniciativa/iniciativa.service';
import { UserService } from '../user.service';
import { Iniciativa } from '../../iniciativa/iniciativa';
import { User } from '../user';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-iniciativausuario',
  templateUrl: './iniciativausuario.component.html',
  styleUrls: ['./iniciativausuario.component.css']
})
export class IniciativausuarioComponent implements OnInit {


  idSelect!:number[];
  usuario!: User;
  iniciativas!: Iniciativa[];
  constructor(private iniciativaService:IniciativaService,private usuarioService:UserService, private router:Router, private activatedRoute: ActivatedRoute,private ngZone: NgZone) {
    this.cargarUsuario
    this.loadIniciativaNotIn
  }


  ngOnInit(): void {


    this.cargarUsuario()
    this.loadIniciativaNotIn();

  }


  cargarUsuario(): void{
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      if (id){
        this.usuarioService.getUser(id).subscribe((usuario)=> this.usuario=usuario

        )
        console.log(this.usuario)
        this.loadIniciativaNotIn()

      }
    })
  }

  addIniciativa(): void{
    console.log(this.idSelect[0])
    this.usuarioService.addIniciativa(this.usuario, this.idSelect[0]).subscribe({
      next: usuario=>{
        this.router.navigate(['/users'])
        Swal.fire('Iniciativa añadida', `Iniciativa añadida al usuario con éxito`, 'success')
      },
      error: err =>{
        console.error(err.error.errors)
      }


    }

    )
  }

  loadIniciativaNotIn(){
    this.activatedRoute.params.subscribe(params=>{
      let id= params['id']
      this.iniciativaService.getIniciativasNotInUser(id).subscribe((response:Iniciativa[])=>{
        this.iniciativas=response;
      });
    })
    console.log(this.usuario)
  }


}


