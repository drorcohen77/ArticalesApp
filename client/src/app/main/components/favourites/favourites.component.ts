import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/core/models/article.model';
import { ApplicationService } from 'src/app/core/services/application.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Article[] = [];
  favourites$: Observable<Article[]> = this.appService.favourites;

  constructor(private appService: ApplicationService, private nav: Router) {}

  ngOnInit(): void {

    this.appService.fetchFavourites().pipe(
      map((articles: Article[]) => {
        this.favourites = articles;
      })
    );
  }

  getArticle(index: number) {
    this.nav.navigateByUrl(`article/${index}`)
  }

  removeFromFavourites(articleId: any) {

    this.appService.removeFavourite(articleId);
  }

}
