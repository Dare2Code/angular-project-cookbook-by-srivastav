import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
//import {Test07TestComponent} from './test07/test/test.component';

const appRoutes: Routes = [
  // Initial visit to the page will be redirected to recipes page
  // Empty path is part of every path/Route, so using pathmatch to overwrite the default prefix
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
    ] },
  { path: 'shopping-list', component: ShoppingListComponent },
  //{ path: 'test', component: Test07TestComponent },
];
@NgModule({
  // Configure the Routes and added to the angular.
  imports: [RouterModule.forRoot(appRoutes)],
  // Since we are in an extra module here and we need to get this to our main module: appModule.
  // Exporting this configured route.
  exports: [RouterModule]
})
export class AppRoutingModule {

}
