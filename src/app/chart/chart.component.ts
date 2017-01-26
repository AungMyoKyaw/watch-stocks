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
  datasetsList:any[]
  labalNameList:any[] = [];
  type:string = 'line';
  data:any;
  options:any = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(private chartService:ChartService) { }

  ngOnInit() {
    this.recentStock = this.chartService.getrecentStockSym();
    this.getStockData(this.recentStock,'tm');
  }

  getStockData(recentStock:string[],period:string){
    let tempDataList = [];
    let tempLabalNameList = [];
    this.datasetsList = [];
    this.labalNameList = [];
    recentStock.forEach((element,i)=>{
      this.chartService.stockData(element,period)
          .subscribe(result=>{
             tempDataList = [];
               result.data.forEach(elem=>{
                 tempDataList.push(Number(elem.Adj_Close));
                 if(i==0){
                  tempLabalNameList.push(elem.Date)
                 }
             });
             this.datasetsList.push({
               "label":element,
               "data":tempDataList.reverse(),
               "fill":false,
               "borderColor":this.chartService.randomColor(),
               "backgroundColor":this.chartService.randomColor(),
               "pointRadius":2
             });
             this.labalNameList = tempLabalNameList.reverse();
             this.data = {
               labels: this.labalNameList,
               datasets: this.datasetsList
             };
          },
          error=>{
            console.log(error)
          });
    });
  }
}
