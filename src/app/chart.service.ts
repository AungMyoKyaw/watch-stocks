import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ChartService {
  recentStock:string[];

  constructor(private http:Http) { }

  stockData(symbol:string,period:string){
    let url = `http://127.0.0.1:4444/api/finance/${symbol}?period=${period}`;
    return this.http.get(url)
                    .map(res=>res.json());
  }

  recentStockSym(){
    this.recentStock = JSON.parse(localStorage.getItem('recent_stock'));
    return this.recentStock;
  }

  addToRecentStockSym(sym:string){
    this.recentStock = JSON.parse(localStorage.getItem('recent_stock')) || [];
    this.recentStock.push(sym);
    localStorage.setItem('recent_stock',JSON.stringify(this.recentStock));
    return JSON.parse(localStorage.getItem('recent_stock'));
  }


}
