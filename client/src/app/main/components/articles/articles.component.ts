import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Observable, Subscription, switchMap } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { AppService } from 'src/app/core/services/app.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  private sub!: Subscription;
  readonly articles$: Observable<Article[]> = this.appService.articleList;
  articlesCategory: Article[] = [];

  constructor(private appService: AppService, private nav: Router, private router: ActivatedRoute) {}

  ngOnInit(): void {
    let category = this.router.snapshot.paramMap.get('category');
    this.sub =
    this.articles$.subscribe((articles: Article[]) => {
      console.log(articles.map(d => d.category.toString()))
      // this.articlesCategory = articles.filter((article: Article) => article.category.toString() === category);
      // console.log(this.articlesCategory)
      // this.articlesCategory.map(article => {

      // })
    });

    this.articles$.pipe(
      map((articles: Article[]) => articles.filter(article => article.category.toString() === category))
    ).subscribe(articles => this.articlesCategory = articles)
  }

  getArticle(index: number) {
    this.nav.navigateByUrl(`article/${index}`)
  }


  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
