import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { elementAt, find, firstValueFrom, map, Observable, Subscription, switchMap, tap } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { AppService } from 'src/app/core/services/app.service';

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

  constructor(private appService: AppService, private activateRoute: ActivatedRoute) {}

  ngOnInit(): void {

    this.index = this.activateRoute.snapshot.paramMap.get('index');

    if(this.index !== undefined) {
      this.sub = this.articles$.subscribe(art => this.article = art[this.index]);
    }
  }


  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
}
