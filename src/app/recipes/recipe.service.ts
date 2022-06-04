import {RecipeModel} from './recipe.model';
import {IngredientModel} from '../shared/models/ingredient.model';
import { DataStorageService} from '../shared/service/data-storage.service';
import { Subject } from 'rxjs';
import { Response, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<RecipeModel[]>(); // 'Sends' an array of recipes as a value

  private recipes: RecipeModel[] = [
    new RecipeModel(
      'Burger',
      [
        new IngredientModel('Meat',1),
        new IngredientModel('Buns',2)
      ],
      'A Simple Test Recipe for a Burger!',
      'https://melbournechapter.net/images/burger-clipart-bar-food-9.png')
    , new RecipeModel(
      'Pudding',
      [
        new IngredientModel('Eggs',2),
        new IngredientModel('Sugar',1)
      ],
      'A Simple Test Recipe for a Pudding',
      'https://unixtitan.net/images1280_/jelly-clipart-pudding-1.png')
  ];

  constructor() {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(recipeID: number) {
    // returning a single recipe with recipeID as INDEX of the object array.
    return this.recipes[recipeID];
  }

  addRecipe(recipe: RecipeModel){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel){
    this.recipes[index] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipeChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: RecipeModel[]){
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
