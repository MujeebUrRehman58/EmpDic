import {User} from './user';
import {Department} from './department';

export class Employee {
    user_id: User;
    department_id: Department;
    full_name: string;
    email: string;
    title: string;
    level: string;
    address: string;
    work_phone: string;
    home_phone: string;
    cell_phone: string;
    man_of_month: boolean;
    profile: File;
  }