import {   Injectable } from "@nestjs/common";


export class AppServiceBase {
  getHello(): string {
    return "Hello World!";
  }

  postHello(): string {
    return "Hello World!";
  }

  public multiply(someNumber:number, otherNumber: number){
    const multiply = someNumber * otherNumber;
    return multiply ;
  }
  public division(dividendo:number, divisor: number){
    
    if(divisor!==0){
      return  dividendo / divisor;
    }else{
       throw new Error(`${divisor} es cero `);
    }
  }

  public raizCuadrada(someNumber:number){
    if(someNumber >= 0){
      return Math.sqrt(someNumber);
    }else{
      throw new Error(`${someNumber} es un numero negativo `);
    }
  }
}

@Injectable()
export class AppService extends AppServiceBase {
  
}