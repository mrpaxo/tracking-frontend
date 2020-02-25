import {Deserializable} from './deserializable.interface';

export class Url implements Deserializable {
  public id: number;
  public url: string;
  public user: number;
  public duracion: string;
  public estado:boolean;
  public modified_date: Date;
  public create_date: Date;
  
  deserialize(input: any): this {
    return Object.assign(this, input);
  }
  }
  
  