import { UserNotebook } from "./userNotebook";
export class User {
  id!:number;
  name!: string;
  surName!:string;
  email!:string;
  projectGroup!:string;
  createAt!:Date;
  password?:string;
  password2!:string;
  rol!:string;
  firstTime:boolean;
  location!:string;
  trainingCenter!:string;
  dni!:string;
  birthDate!:Date;
  startDateFTC!:Date;
  endDateFTC!:Date;
  type!:string;
  NNSS!:string;
  RR!:string;
  CeCo!:string;
  OrgUnit!:string;
  society!:string;
  phone!:string;
  active:boolean;
  das!:string;
  emailAtos!:string;
  convenio!:string;
  scholarshipAtos!:string;
  positionId!:string;
  contacCenterEducate!:string;
  attrack!:string;
  teacher!:string;
  teamsGroupName!:string;
  PO!:string;
  group!:string;
  autorDAS!:string;
  updateUser!:Date;
  foto!:string;
  notaFinal?: number;
  userNotebook?: UserNotebook;

  constructor(){

    this.firstTime=true;
    this.active=true;

  }

}
