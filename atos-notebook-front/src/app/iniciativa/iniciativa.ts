export class Iniciativa{
  id!:number;
  title!:string;
  description!:string;
  starDate!:Date;
  endDate!:Date;
  createAt!:Date;
  active:boolean;
  deactivatedBy!:String
  deactivatedDate!:Date
  constructor() {
  this.active=true;
  }
}
