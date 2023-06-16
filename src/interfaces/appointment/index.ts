import { UserInterface } from 'interfaces/user';
import { EmployeeInterface } from 'interfaces/employee';
import { ServiceInterface } from 'interfaces/service';
import { GetQueryInterface } from 'interfaces';

export interface AppointmentInterface {
  id?: string;
  customer_id: string;
  employee_id: string;
  service_id: string;
  appointment_time: any;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  employee?: EmployeeInterface;
  service?: ServiceInterface;
  _count?: {};
}

export interface AppointmentGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  employee_id?: string;
  service_id?: string;
  status?: string;
}
