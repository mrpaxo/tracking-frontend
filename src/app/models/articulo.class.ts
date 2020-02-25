import { Url } from './url.model';
import { Historial } from './historial.model';

export class Articulo {
  public id: number;
  public nombre: string;
  public modified_date: Date;
  public create_date: Date;
  public url: Url[];
  public hist_precio: Historial[];
  
  deserialize(input: any): this {
    // Assign input to our object BEFORE deserialize our cars to prevent already deserialized cars from being overwritten.
    Object.assign(this, input);
    this.hist_precio = input.hist_precio.map((hist_precio: any) => new Historial().deserialize(hist_precio));

    return this;
    }
   
  }
  
  