import { AppointmentInterface } from 'interfaces/appointment';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface ServiceInterface {
  id?: string;
  name: string;
  price: number;
  restaurant_id: string;
  created_at?: any;
  updated_at?: any;
  appointment?: AppointmentInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    appointment?: number;
  };
}

export interface ServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  restaurant_id?: string;
}
