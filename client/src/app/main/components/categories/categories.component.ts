import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  categories:string[] = [];

  constructor(private appService: ApiService, private nav: Router) {}


  ngOnInit(): void {

    this.sub = this.appService.getArticles().subscribe((data: any) => {
      data.results.map(
        (obj: Article) => {
          this.categories.push(obj.category.toString() );
        });
        this.categories = [...new Set(this.categories)];
    });

        // Object.values(data).map(val => {
        //   if(typeof(val) === 'object') {
        //     let arr: any = val ;
        //     arr.map((x: any) => {
        //        this.categories.push(x.category[0]);
        //     });
        //   }
        // });
  }

  getArticles(category: string) {
    this.nav.navigate([`articles`,category]);
    console.log(category)
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
