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

  period:string = 'tm';
  chartMessage:string = '';

  constructor(private chartService:ChartService) { }

  ngOnInit() {
    this.recentStock = this.chartService.getrecentStockSym();
    if(this.recentStock.length){
      this.getStockData(this.recentStock,this.period);
    } else {
      this.chartMessage = 'No recent stock chart to display!';
      this.labalNameList = []
      this.data = {
        labels: [],
        datasets: []
      };
      this.datasetsList = [];
      this.labalNameList = [];
    }
  }

  getStockData(recentStock:string[],period:string){
    let tempDataList = [];
    let tempLabalNameList = [];
    this.datasetsList = [];
    this.labalNameList = [];
    if(recentStock.length){
      this.chartMessage = 'Loading';
      recentStock.forEach((element,i)=>{
        this.chartService.stockData(element,period)
            .subscribe(result=>{
               tempDataList = [];
                 result.data.forEach(elem=>{
                   tempDataList.push(Number(elem.Adj_Close));
                   if(i==0){
                    tempLabalNameList.push(elem.Date)
                   }
                   if(i==recentStock.length-1){
                     this.chartMessage = '';
                   }
               });
               this.datasetsList.push({
                 "label":element,
                 "data":tempDataList.reverse(),
                 "fill":false,
                 "borderColor":this.chartService.randomColor(),
                 "pointRadius":2,
                 "borderWidth":4
               });
               this.labalNameList = tempLabalNameList.reverse();
               this.data = {
                 labels: this.labalNameList,
                 datasets: this.datasetsList
               };
            },
            error=>{
              this.chartMessage = 'Error on displaying chart.\n Please refresh Browser';
              console.log(error)
            });
      });
    } else {
      this.chartMessage = 'No recent stock chart to display!';
      this.labalNameList = [];
      this.data = {};
    }

  }

  addToChart(stockSym:string){
    this.chartMessage = 'Loading';
    this.chartService.stockData(stockSym,this.period)
        .subscribe(result=>{
          let tempDataList = [];
          let tempLabalNameList = [];
          result.data.forEach(elem=>{
            tempDataList.push(Number(elem.Adj_Close));
             tempLabalNameList.push(elem.Date)
          });
          this.datasetsList.push({
            "label":stockSym,
            "data":tempDataList.reverse(),
            "fill":false,
            "borderColor":this.chartService.randomColor(),
            "pointRadius":2,
            "borderWidth":4
          });
          this.labalNameList = tempLabalNameList.reverse();
          this.data = {
            labels: this.labalNameList,
            datasets: this.datasetsList
          };
          this.chartService.addToRecentStockSym(stockSym);
          this.recentStock.push(stockSym);
          this.chartMessage = '';
        },
        error=>{
          this.chartMessage = 'Error on displaying chart.\n Please refresh Browser';
          console.log(error);
        })
  }

  removeFromChart(sym:string){
    let itemIndex = this.recentStock.indexOf(sym);
    if(itemIndex>-1){
      this.recentStock.splice(itemIndex,1);
      localStorage.setItem('recent_stock',JSON.stringify(this.recentStock));
    }
    if(this.recentStock.length){
      this.chartMessage = 'Loading';
      this.getStockData(this.recentStock,this.period);
    } else {
      this.chartMessage = 'No recent stock chart to display!';
      this.labalNameList = []
      this.data = {
        labels: [],
        datasets: []
      };
      this.datasetsList = [];
      this.labalNameList = [];
    }
  }

  changePeriod(event:any){
    this.period = event.target.value;
    this.getStockData(this.recentStock,this.period);
  }
}
