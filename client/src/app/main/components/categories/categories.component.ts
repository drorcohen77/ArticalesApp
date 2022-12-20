import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  readonly categories$: Observable<Article[]> = this.appService.articleList;
  categories: any = [];

  constructor(private appService: AppService) {}


  ngOnInit(): void {

    this.sub = this.appService.getArticles().subscribe((data: any) => {
      data.results.map(
        (obj: Article) => {
          this.categories.push(obj.category.toString() );
        });

        // Object.values(data).map(val => {
        //   if(typeof(val) === 'object') {
        //     let arr: any = val ;
        //     arr.map((x: any) => {
        //        this.categories.push(x.category[0]);
        //     });
        //   }
        // });
    });
  }

  getArticles(category: string) {
    console.log(category)
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }

}
