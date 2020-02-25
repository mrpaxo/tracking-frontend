import {Deserializable} from './deserializable.interface';

export class Historial implements Deserializable {
  public id: number;
  public precio:String;
  public modified_date: Date;
  public created_date: Date;
  
  deserialize(input: any): this {
    return Object.assign(this, input);
    }
 
  }
  
  