import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytics.service';
import { Observable } from 'rxjs';
import { OverviewPage } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-overview-page',
  template: './overview-page.component.html',
  styleUrls: ['./_overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tapTarget') 'tapTargetRef': ElementRef
  'tapTarget': MaterialInstance
  'data$': Observable<OverviewPage>

  yesterday = new Date()

  constructor(private service: AnalyticsService) { }

  ngOnInit(){
    this.data$ = this.service.getOverview()
    this.yesterday.setDate(this.yesterday.getDate()-1)
  }

  ngAfterViewInit(){
    this.tapTarget = MaterialService.initTapTarget(this.tapTargetRef)
  }

  ngOnDestroy(){
    this.tapTarget.destroy()
  }

  openInfo(){
    this.tapTarget.open()
  }
}

