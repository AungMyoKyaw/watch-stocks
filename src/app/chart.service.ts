import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {
  recentStock:any;

  constructor(private http:Http) { }

  stockData(symbol:string,period:string){
    let url = `http://127.0.0.1:4444/api/finance/${symbol}?period=${period}`;
    return this.http.get(url)
                    .map(res=>res.json());
  }

  getrecentStockSym(){
    this.recentStock = localStorage.getItem('recent_stock');
    if(this.recentStock==undefined){
      this.recentStock = ['goog','aapl','fb','msft'];
      localStorage.setItem('recent_stock',JSON.stringify(this.recentStock));
    } else {
      this.recentStock = JSON.parse(this.recentStock);
    }
    return this.recentStock;
  }

  addToRecentStockSym(sym:string){
    this.recentStock = localStorage.getItem('recent_stock');
    if(this.recentStock==undefined){
      this.recentStock = [];
    } else {
      this.recentStock = JSON.parse(this.recentStock);
    }
    this.recentStock.push(sym);
    localStorage.setItem('recent_stock',JSON.stringify(this.recentStock));
    return JSON.parse(localStorage.getItem('recent_stock'));
  }

  randomColor(){
    let color = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
    let toReturn = '#';
    for(let i=0;i<6;i++){
      toReturn+=color[Math.round(9*Math.random())]
    }
    return toReturn;
  }

}
