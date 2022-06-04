import {Component,  OnInit, OnDestroy} from '@angular/core';
import { RecipeModel} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {ActivatedRoute, Router} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: RecipeModel[];
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // subscribe to the change in the recipes array
    this.recipeSubscription = this.recipeService.recipeChanged.subscribe(
      (newRecipeArray: RecipeModel[]) => {this.recipes = newRecipeArray;},
    );

    this.recipes = this.recipeService.getRecipes();
  }
  onNewRecipe() {
    // Go to recipe/new page
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  OnDestroy(){
    this.recipeSubscription.unsubscribe();
  }

}
