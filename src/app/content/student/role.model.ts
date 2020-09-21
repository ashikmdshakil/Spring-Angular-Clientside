import { Student } from './student.model';

export class Role{
    id: number;
    role_name: string;
    student: Student;
    constructor(role_name: string){
        this.role_name = role_name;
    }
}