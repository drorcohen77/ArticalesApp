import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  article!: Article;
  private sub!: Subscription;
  readonly articles$: Observable<Article[]> = this.appService.articleList;
  index!: any;

  constructor(private appService: ApiService, private activateRoute: ActivatedRoute, private nav: Router) {}

  ngOnInit(): void {

    this.index = this.activateRoute.snapshot.paramMap.get('index');

    if(this.index !== undefined) {
      this.sub = this.articles$.subscribe(art => this.article = art[this.index]);
    }
  }

  backToArticles(category: string) {
    this.nav.navigateByUrl(`/articles/${category}`);
  }


  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
