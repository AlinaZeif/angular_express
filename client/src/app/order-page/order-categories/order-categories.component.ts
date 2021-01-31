import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Observable } from 'rxjs';
import {Category} from '../../shared/interfaces'

@Component({
  selector: 'app-order-categories',
  template: './order-categories.component.html',
  styleUrls: ['./_order-categories.component.scss']
})
export class OrderCategoriesComponent implements OnInit {

  'categories$': Observable<Category[]>

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(){
    this.categories$ = this.categoriesService.fetch()
  }

}
