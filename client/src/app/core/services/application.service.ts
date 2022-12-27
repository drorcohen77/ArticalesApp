import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Article } from '../models/article.model';
import { ServerHttp } from '../variebles/server_api';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private favouritesArticles: Article[] = [];

  private readonly favourites$ = new BehaviorSubject<Article[]>([]);
  readonly favourites = this.favourites$.asObservable();

  constructor(private http: HttpClient, private apiEndpoint: ServerHttp, private apiService: ApiService) { }

  fetchFavourites(): Observable<Article[]> {

    // return this.http
    //   .get<Article[]>(this.apiEndpoint.server_api_uri)
    //   .pipe(
    //     tap((data: any) => {
    //       this.favouritesArticles = data;
    //       this.favourites$.next(this.favouritesArticles);
    //     })
    //   );

      return this.apiService.articleList.pipe(
        tap(articles => {
          this.favouritesArticles = articles;
          console.log(this.favouritesArticles)
          this.favourites$.next(this.favouritesArticles);
        })
      );

  }

  async addToFavourites(article: Article): Promise<void> {

    this.favouritesArticles = [...this.favouritesArticles, article];
    this.favourites$.next(this.favouritesArticles);

    return Promise.resolve();
  }

  async removeFavourite(articleID: string) {

    // let temp = [...this.favouritesArticles.splice(
    //     this.favouritesArticles.findIndex(article => article._id === articleID), 1)];
    // this.favourites$.next(temp);

    [...this.favouritesArticles] = this.favouritesArticles.filter(article => article.title !== articleID);
    this.favourites$.next(this.favouritesArticles);
  }
}
