import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ApiService } from 'src/app/core/services/api.service';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  private sub!: Subscription;
  readonly articles$: Observable<Article[]> = this.apiService.articleList;
  readonly favourites$: Observable<Article[]> = this.appService.favourites;


  constructor(
    private apiService: ApiService,
    private appService: ApplicationService,
    private nav: Router,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {

    // let category = this.router.snapshot.paramMap.get('category');
    // this.articles$.pipe(
    //   map((articles: Article[]) =>
    //   articles.filter(article => article.category.toString() === category)
    //   )
    // );

    // this.sub =
    // this.articles$.subscribe((articles: Article[]) => {
    //   console.log(articles.map(d => d.category.toString()))
      // this.articlesCategory = articles.filter((article: Article) => article.category.toString() === category);
      // console.log(this.articlesCategory)
      // this.articlesCategory.map(article => {

      // })
    // });





    this.router.paramMap.pipe(
      map(cat => cat.get('category')),
      switchMap(category => this.articles$.pipe(
        map((articles: Article[]) =>
          articles.filter(article => article.category.toString() === category)
        )
      ))
    );
  }

  getArticle(index: number) {
    this.nav.navigateByUrl(`article/${index}`)
  }

  async addToFavourites(article: Article) {
    article.favourites = true;
    console.log(article)
    this.appService.addToFavourites(article);
  }


  // ngOnDestroy(): void {
  //   if(this.sub) {
  //     this.sub.unsubscribe();
  //   }
  // }
}
