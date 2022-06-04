import {Component,  OnInit} from '@angular/core';
import {RecipeModel} from '../recipe.model';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: RecipeModel;
  recipeID: number;

  constructor( private slService: ShoppingListService,
               private recipeService: RecipeService,
               private route: ActivatedRoute,
               private router: Router) { }

  ngOnInit() {
    // Fetching the URL parameter (Recipe ID) on call/change and saving it to recipeID.
    this.route.params
      .subscribe(
        (urlParameters: Params) => {
          // Get the ID parameter in number format and save it.
          this.recipeID = +urlParameters['id'];
          // When ever the ID changes, get the new recipe with the ID
          this.recipe = this.recipeService.getRecipe(this.recipeID);
        }
    );
  }


  // add the selected recipe's ingredients to shopping list
  addIngredientsToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

  // executed when the user click on edit recipe link.
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
    // Other way
    // this.router.navigate(['../', this.recipeID, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.recipeID);
    this.router.navigate(['recipes']);
  }
}
