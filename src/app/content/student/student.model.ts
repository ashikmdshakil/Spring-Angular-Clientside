import { from } from 'rxjs';
import {Role} from './role.model'
export class Student{
    id: number;
    name: string;
    mail: string;
    department: string;
    password: string;
    role: string;
    constructor(id: number, name: string, mail: string, department: string ){
        this.id = id;
        this.name = name;
        this.mail = mail;
        this.department = department;
    }

}