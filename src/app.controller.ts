import { Body, Controller, Get, Post, Redirect, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Items } from './Items';
import { error } from 'console';
import { OpenItemsDto } from './OpenItems.dto';
import { orderDto } from './order.dto';
import { Response } from 'express';
import { Order } from './Order';


@Controller()
export class AppController {
  #items: Items[] = [
    {
      id: '1',
      picture: "https://www.pcguru.hu/uploads/editors/pc-ram.jpg",
      title: 'RAM',
      cost: 15000
    },
    {
      id: '2',
      picture: "https://www.pcguru.hu/uploads/editors/gigabyte-z97x-gaming-3-motherboardofficial2.jpg",
      title: 'Alaplap',
      cost: 45000
    },
    {
      id: '3',
      picture: "https://lh6.googleusercontent.com/proxy/R-_Qpyhv1MeKI6luDLk9LMP5kjUrkJrgJ6W3fziVvVmnNJYKXn6dJzHkavKgrlmkIr-YWqttbWByt4FhNjIBgN62LAUOHFlL7uVSjGWNGuUMjNuT",
      title: 'Processzor',
      cost: 150000
    }
  ]
  #order: Order[] = [];
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  @Get("openItems")
  @Render("openItems")
  openItemsForm() {
    return {
      data: this.#items,
      errors: [],
    }
  }
  @Post('openItems')
  openItems(@Body() openAccountDto: OpenItemsDto,
    @Res() response: Response
  ) {

    let errors = [];


    response.redirect('/order');

  }
  @Get('openItemsOrder')
  openItemsOrder() {
    return 'Sikeres létrehozás';
  }
  @Get('order')
  @Render('orderForm')
  orderForm() {
    return {
      data: this.#items
    }
  }
  @Post('order')
  orderPost(@Body() orderDto: orderDto,
    @Res() response: Response) {
    let errors = [];
    if(errors.length>0){
      response.render('openAccountForm',{
        data: orderDto,
        errors
      })
      return;
    }


    const newOrder: Order = {
      name: orderDto.Name,
      szamOrsz: orderDto.SzamOrsz,
      szamIr: orderDto.SzamIr,
      szamVar: orderDto.szamVar,
      szamUtca: orderDto.szamUtca,
      szalOrsz: orderDto.SzamOrsz,
      szalIr: orderDto.SzalIr,
      szalVar: orderDto.szalVar,
      szalUtca: orderDto.szalUtca,
      kupon: orderDto.kupon,
      cardNum: orderDto.cardNum,
      cardDate: orderDto.cardDate,
      cardCvc: orderDto.cardCvc,

    }
    this.#order.push(newOrder);
    response.redirect('/openOrderSeccess');
  }
  @Get('openOrderSeccess')
  openOrderSeccess(){
    return 'Sikeres rendelés.'
  }
}
