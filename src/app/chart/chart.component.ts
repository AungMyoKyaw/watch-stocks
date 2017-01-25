import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  providers: [ ChartService ]
})
export class ChartComponent implements OnInit {
  recentStock:string[];

  constructor(private chartService:ChartService) { }

  ngOnInit() {
    this.recentStock = this.chartService.addToRecentStockSym('goog');
    this.recentStock = this.chartService.recentStockSym();
    // console.log(this.recentStock,this.recentStock.length);
    this.chartService.stockData('goog','yr')
                     .subscribe(result=>{
                       console.log(result)
                     },
                     error=>{
                       console.log(error)
                     });
  }
}
