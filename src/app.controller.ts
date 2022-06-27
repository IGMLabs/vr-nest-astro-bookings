import { Body, Controller, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { get } from "http";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  public postHello(@Body() name:any): string {
    const nameString = JSON.stringify(name);
    return nameString;
  }

  @Post("name")
  public postHelloName(@Body() payload:{name:string}): string {

    return `Hello ${payload.name}`;
  }

  @Get("/test")
  public getTest() :string{
    return "Hola Test";
  }

  @Get('/param/:id')
  public getParam(@Param("id") id: string):string{
    const type =  typeof id;
    return `Param: ${id} of type ${type}` ;
  }

  @Get('/square/:someParam')
  public getSquare(@Param("someParam")someParam: number) : string{
    const type =  typeof someParam;
    const square = someParam * someParam;
    return `Square: ${someParam} of type ${type} is ${square}` ;
  }

  @Get('/square/pipe/:someParam')
  public getSquarePipe(@Param("someParam", ParseIntPipe)someNumber: number) : string{
    const type =  typeof someNumber;
    const square = someNumber * someNumber;
    return `Square: ${someNumber} of type ${type} is ${square}` ;
  }

  @Get('/square/Nan/:someParam')
  public getSquareNan(@Param("someParam")someParam: number) : string{
    const someNumber = parseInt(someParam.toString());
    if (isNaN(someNumber)) throw new HttpException(`${someParam} is not a number`, HttpStatus.BAD_REQUEST);
    const type =  typeof someNumber;
    const square = someNumber * someNumber;
    return `Square: ${someParam} of type ${type} is ${square}` ;
  }


  @Get('/multiply/:someParam/:otherNumber')
  public getMultiply(
    @Param("someParam", ParseIntPipe)someNumber: number,
    @Param("otherNumber", ParseIntPipe)otherNumber: number,
    ) : number{
    const multiply = this.appService.multiply(someNumber, otherNumber);
    return multiply ;
  }

  @Get('/multiply/query')
  public getMultiplyQuery(
    @Query("a", ParseIntPipe)someNumber: number,
    @Query("b", ParseIntPipe)otherNumber: number,
    ) : number{
    return this.appService.multiply(someNumber, otherNumber) ;
  }

  @Get('/division/query')
  public getDivisionQuery(
    @Query("a", ParseIntPipe)someNumber: number,
    @Query("b", ParseIntPipe)otherNumber: number,
    ) : number{
      try{
        return this.appService.division(someNumber, otherNumber) ;

      }catch(error){
        throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
      }
      
  }

  @Get('/raizCuadrada/query')
  public getRaizCuadradaQuery(
    @Query("a", ParseIntPipe)someNumber: number
    ) : number{
    try{
      return this.appService.raizCuadrada(someNumber) ;

    }catch(error){
      throw new HttpException(error.message,HttpStatus.BAD_REQUEST);
    }
  }

  
}
