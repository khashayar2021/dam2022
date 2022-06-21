import { NgModule} from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UserService} from './user/user.service';
import { FormularioUsersComponent } from './user/formulario-users/formulario-users.component';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ChangepasswordComponent } from './user/changepassword/changepassword.component';
import { IniciativaComponent } from './iniciativa/iniciativa.component';
import { FormularioIniciativaComponent } from './iniciativa/formulario-iniciativa/formulario-iniciativa.component';
import { IniciativaService } from './iniciativa/iniciativa.service';
import { NotebookComponent } from './notebook/notebook.component';
import { QuestionComponent } from './notebook/topic/question/question.component';
import { AnswerComponent } from './notebook/topic/answer/answer.component';
import { QuestionformComponent } from './notebook/topic/question/questionform/questionform.component';
import { UnactiveusersComponent } from './user/unactiveusers/unactiveusers.component';
import { HomeComponent } from './home/home.component';
import { InactiveIniciativaComponent } from './iniciativa/inactive-iniciativa/inactive-iniciativa.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { FooterComponent } from './footer/footer.component';
import { FormularioNotebookComponent } from './notebook/formulario-notebook/formulario-notebook.component';
import { NotebookService } from './notebook/notebook.service';
import { PerfilComponent } from './perfil/perfil.component';
import { NotebookListComponent } from './notebook/notebook-list/notebook-list.component';
import { IniciativausuarioComponent } from './user/addIniciativa/iniciativausuario.component';

import {AccordionModule} from 'primeng/accordion';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {PanelModule} from 'primeng/panel';
import {MenubarModule} from 'primeng/menubar';
import {DialogModule} from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { QuestioneditComponent } from './notebook/topic/question/questionedit/questionedit.component';
import {ColorPickerModule} from 'primeng/colorpicker';
import {FileUploadModule} from 'primeng/fileupload';
import { AddnotebookComponent } from './iniciativa/addnotebook/addnotebook.component';
import { NotebooksListComponent } from './alumno/notebooks-list/notebooks-list.component';
import { ContenidoNotebookComponent } from './alumno/contenido-notebook/contenido-notebook.component';
import {DragDropModule} from '@angular/cdk/drag-drop';

import {PasswordModule} from 'primeng/password';
import { PreguntaComponent } from './alumno/pregunta/pregunta.component';
import { ListAlumnnosComponent } from './gestor/list-alumnnos/list-alumnnos.component';
import { NotebookviewComponent } from './gestor/notebookview/notebookview.component';
import { ListNotebooksComponent } from './gestor/list-notebooks/list-notebooks.component';
import {KnobModule} from 'primeng/knob';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'login', component: LoginComponent},
  {path:'users', component:UserComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/form', component:FormularioUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/form/:id', component:FormularioUsersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'users/password/:id', component:ChangepasswordComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'iniciativas', component:IniciativaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'iniciativas/form', component:FormularioIniciativaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'iniciativas/form/:id', component:FormularioIniciativaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'iniciativas/inactive',component:InactiveIniciativaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'preguntas/notebook/:id', component:QuestionComponent, canActivate: [AuthGuard]},
  {path:'preguntas/:id', component:QuestionComponent, canActivate: [AuthGuard]},
  {path:'pregunta/form', component:QuestionformComponent, canActivate: [AuthGuard]},
  {path:'pregunta/form/:id', component:QuestionformComponent, canActivate: [AuthGuard]},
  {path:'pregunta/edit/:id/:note', component:QuestioneditComponent, canActivate: [AuthGuard]},
  {path:'respuesta', component:AnswerComponent, canActivate: [AuthGuard]},
  {path:'users/unactive', component:UnactiveusersComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'notebook', component:NotebookComponent, canActivate: [AuthGuard]},
  {path:'notebook/list', component:NotebookListComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'notebook/form',component:FormularioNotebookComponent,canActivate:[AuthGuard]},
  {path:'notebook/form/:id',component:FormularioNotebookComponent,canActivate:[AuthGuard]},
  {path:'notebook/:id', component:NotebookComponent, canActivate: [AuthGuard]},
  {path:'perfil', component: PerfilComponent, canActivate: [AuthGuard]},
  {path: 'home', component: HomeComponent},
  {path:'users/iniciativa/add/:id', component:IniciativausuarioComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'iniciativa/notebook/add/:id', component:AddnotebookComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ADMIN'}},
  {path:'notebooks', component:NotebooksListComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ALUMNO'}},
  {path:'notebooks/contenido/:id', component:ContenidoNotebookComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ALUMNO'}},
  {path:'notebooks/pregunta/:id', component:PreguntaComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ALUMNO'}},

  {path:'alumnos', component: ListAlumnnosComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'GESTOR'}},
  {path:'alumnos/notebooks/:id', component: ListNotebooksComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'GESTOR'}},
  {path:'alumnos/notebookview/:id/:note', component:NotebookviewComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'GESTOR'}}
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    UserComponent,
    FormularioUsersComponent,
    LoginComponent,
    ChangepasswordComponent,
    IniciativaComponent,
    FormularioIniciativaComponent,
    NotebookComponent,
    QuestionComponent,
    AnswerComponent,
    QuestionformComponent,
    UnactiveusersComponent,
    HomeComponent,
    InactiveIniciativaComponent,
    FormularioNotebookComponent,
    PerfilComponent,
    NotebookListComponent,
    IniciativausuarioComponent,
    NotebookListComponent,
    QuestioneditComponent,
    AddnotebookComponent,
    NotebooksListComponent,
    ContenidoNotebookComponent,
    PreguntaComponent,
    ListAlumnnosComponent,
    NotebookviewComponent,
    ListNotebooksComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TableModule,
    AccordionModule,
    BrowserAnimationsModule,
    PanelModule,
    DialogModule,
    MenubarModule,
    ColorPickerModule,
    FileUploadModule,
    RouterModule.forRoot(routes),
    DragDropModule,
    PasswordModule,
    ReactiveFormsModule,
    KnobModule,
    NgbModule,
  ],
  providers: [UserService,IniciativaService,NotebookService, MessageService],
  bootstrap: [AppComponent]
})


export class AppModule { }
