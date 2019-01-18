import { Component, OnInit } from '@angular/core';
// import { ChangeDetectorRef } 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  public title = 'angular-basic';
  public timer;
  public baseData = [
    { label: 'GOOG', price: '1001.67', vol: 244677557 }, // price stored as a string to avoid truncation of .00 decimals
    { label: 'APPL', price: '120.56', vol: 306837209 },
    { label: 'AMZN', price: '1500.67', vol: 256798553 },
    { label: 'MSFT', price: '120.67', vol: 578940448 },
  ];

  getRnd (min, max) {
    return Math.random() * (max - min) + min;
  }

  xPctOf (x, num) {
    return x / 100 * num;
  }

  getDelta (x, y) {
    return this.getRnd(0, this.xPctOf(x, y)); 
  }

  changeData () {
    for (let i = 0; i < this.baseData.length; i += 1) {
      let r = this.baseData[i];
      let dp = parseFloat(r.price)
      let pc = r.label === 'MSFT' ? 0.5 : 0.3; // Microsoft diserve a little more price volatility
      let delp = this.getDelta(pc, dp);
      dp = (Math.round(this.getRnd(0,1)) === 1 ? dp + delp : dp - delp);
      r.price = Math.abs(dp).toFixed(2);

      let vc = r.label === 'GOOG' ? 0.005 : 0.001; 
      let delv = this.getDelta(vc, r.vol);
      r.vol = Math.abs(Math.floor(Math.round(this.getRnd(0,1)) === 1 ? r.vol + delv : r.vol - delv));
    }
  }

  goManual () {
    clearInterval(this.timer);
    this.changeData();
  }

  ngOnInit () {
    this.timer = setInterval(() => {
      this.changeData();
    }, 1000);
  }
}

