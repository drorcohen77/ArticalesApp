import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/article.model';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { OutsourceApi } from '../variebles/outsource_api';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private articles: Article[] = [];
  private categories = [];

  private readonly articleList$ = new BehaviorSubject<Article[]> ([]);
  readonly articleList = this.articleList$.asObservable();

  constructor(private http: HttpClient, private apiEndpoint: OutsourceApi) { }

  getArticles(): Observable<Article[]> {

    return this.http
      .get<Article[]>(this.apiEndpoint.newsdata_api_uri + this.apiEndpoint.newsdata_api_key + this.apiEndpoint.searchCriteria)
      .pipe(
        tap((data: any) => {
          this.articles = data;
          this.articleList$.next(this.articles);
        })
      );
  }



}
