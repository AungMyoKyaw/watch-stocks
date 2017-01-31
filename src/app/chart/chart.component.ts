import { Component, OnInit } from '@angular/core';
import { ChartService } from '../chart.service';

import * as io from "socket.io-client";

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
    this.creatingChart();
  }

  creatingChart(){
    let socket = io.connect('/');
    socket.on('news',(data)=>{
      console.log(data,'socket data');
      this.recentStock = data;
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
    })
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
              this.chartMessage = 'Error on displaying chart. Please refresh Browser';
              if(error.status==500){
                let index = this.recentStock.indexOf(element);
                this.recentStock.splice(index,1);
                this.chartService.removeSliently(element);
              }
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
    this.chartService.addToRecentStockSym(stockSym);
  }

  removeFromChart(sym:string){
    this.chartMessage = 'Loading';
    this.chartService.removeFromRecentList(sym);
  }

  changePeriod(event:any){
    this.period = event.target.value;
    this.getStockData(this.recentStock,this.period);
  }
}
