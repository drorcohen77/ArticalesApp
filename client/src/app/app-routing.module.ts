import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './main/components/categories/categories.component';
import { FavouritesComponent } from './main/components/favourites/favourites.component';

const routes: Routes = [
  { path: '', redirectTo: 'categories', pathMatch: 'full'},
  { path: 'categories', component: CategoriesComponent},
  { path: 'favourites', component: FavouritesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
