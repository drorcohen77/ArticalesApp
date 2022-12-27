import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './main/components/categories/categories.component';
import { ArticlesComponent } from './main/components/articles/articles.component';
import { FavouritesComponent } from './main/components/favourites/favourites.component';
import { ArticleComponent } from './main/components/article/article.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { OutsourceApi } from './core/variebles/outsource_api';
import { ButtonComponent } from './core/components/button/button.component';
import { ServerHttp } from './core/variebles/server_api';


@NgModule({
    declarations: [
        AppComponent,
        CategoriesComponent,
        ArticlesComponent,
        FavouritesComponent,
        ArticleComponent,
        NavbarComponent,
        ButtonComponent,
    ],
    providers: [OutsourceApi, ServerHttp],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ]
})
export class AppModule { }
