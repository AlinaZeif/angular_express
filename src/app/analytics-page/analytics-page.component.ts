import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { AnalyticsPage } from '../shared/interfaces';
import { Chart } from 'chart.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./_analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('gain') 'gainRef': ElementRef
  @ViewChild('order') 'orderRef': ElementRef

  'aSub': Subscription
  'average': number
   pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit(){
    const gainConfig: any = {
        label: "Выручка",
        color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: "Заказы",
      color: 'rgb(54, 162, 235)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage)=>{
      this.average = data.average

      gainConfig.labels = data.chart.map(item => item.label)
      gainConfig.data = data.chart.map(item => item.gain)

      orderConfig.labels = data.chart.map(item => item.label)
      orderConfig.data = data.chart.map(item => item.order)

      //*********** Gain temp************** */
        // gainConfig.labels.push('04.01.2021')
        // gainConfig.labels.push('05.01.2021')
        // gainConfig.data.push(1500)
        // gainConfig.data.push(700)
      //*********** Gain temp************** */


      //***********Order temp************** */
        // orderConfig.labels.push('04.01.2021')
        // orderConfig.labels.push('05.01.2021')
        // orderConfig.data.push(8)
        // orderConfig.data.push(2)
      //*********** Order temp************** */

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy(){
    if(this.aSub){
        this.aSub.unsubscribe()
    }
  }
}

function createChartConfig({labels, data, label, color}:any){
  return{
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets:  [
        {
          label, data, 
          borderColor: color, 
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
