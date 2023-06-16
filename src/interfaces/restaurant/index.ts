import { EmployeeInterface } from 'interfaces/employee';
import { ServiceInterface } from 'interfaces/service';
import { WorkingHourInterface } from 'interfaces/working-hour';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RestaurantInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  employee?: EmployeeInterface[];
  service?: ServiceInterface[];
  working_hour?: WorkingHourInterface[];
  user?: UserInterface;
  _count?: {
    employee?: number;
    service?: number;
    working_hour?: number;
  };
}

export interface RestaurantGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
