'use strict';

const financeApi = require('yahoo-finance-data');
const myapi = new financeApi();

function getFinanceData(req,res){
  let stockCode = req.params.stockCode;
  let period = req.query.period || 'yr';
  let end = new Date();
  let start = new Date();
  switch(period){
    case 'yr':
      start = start.setFullYear(start.getFullYear()-1);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
    case 'sm':
      start = start.setMonth(start.getMonth()-6);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
    case 'tm':
      start = start.setMonth(start.getMonth()-3);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
    case 'om':
      start = start.setMonth(start.getMonth()-1);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
    case 'w':
      start = start.setDate(start.getDate()-7);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
    default:
      start = start.setFullYear(start.getFullYear()-1);
      start = new Date(start).toLocaleDateString();
      end = end.toLocaleDateString();
      break;
  }
  let startArr = start.split('/');
  let endArr = end.split('/');
  start = `${startArr[2]}-${startArr[0]}-${startArr[1]}`;
  end = `${endArr[2]}-${endArr[0]}-${endArr[1]}`;
  myapi.getHistoricalData(stockCode,start,end)
       .then((data)=>{
        res.json(data);
       })
       .catch((err)=>{
        res.status(500).send(err);
       })
}

module.exports = getFinanceData;
