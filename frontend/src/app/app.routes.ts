import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';

import { TagsComponent } from './components/partials/tags/tags.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';

export const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'menu-tags', component:TagsComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'food/:id', component: FoodPageComponent}
];
