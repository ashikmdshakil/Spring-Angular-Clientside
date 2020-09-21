import { from } from 'rxjs';
import {Role} from './role.model'
export class Student{
    id: number;
    name: string;
    mail: string;
    department: string;
    password: string;
    roles: Role[];
    constructor(){

    }

}