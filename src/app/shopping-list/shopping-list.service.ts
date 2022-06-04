import {IngredientModel} from '../shared/models/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {

  // initiating an event to capture any change in the ingredient array
  ingredientsChange = new Subject<IngredientModel[]>();

  startedEditing = new Subject<number>();
  private ingredients: IngredientModel[] = [
    new IngredientModel('apples', 5),
    new IngredientModel('bananas', 10)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient( newIngredient: IngredientModel) {
    this.ingredients.push(newIngredient);
    // Emits an event with the change in the ingredient
    this.ingredientsChange.next(this.ingredients.slice());
  }

  // Buld Adding Ingredients from Recipe
  addIngredients(newIngredients: IngredientModel[]) {

    // Add/Append new items to the ingredients Array
    this.ingredients.push(...newIngredients);

    // Emit an event with the updated ingredient.
    this.ingredientsChange.next(this.ingredients.slice());
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  //Update Ingredients from Shoppinglist
  updateIngredient(index: number, newIngredient: IngredientModel){
    
    // Set the Ingredient with the Index to the new ingredient
    this.ingredients[index] = newIngredient;
    
    // Emit an event with the updated ingredient.
    this.ingredientsChange.next(this.ingredients.slice());
  }

  // Deleted an ingredient with the matching index
  deleteIngredient(index: number){

    // Deletes the ingredient value from ingredients Array with index value
    this.ingredients.splice(index,1);

    // Emit an event with the updated ingredient.
    this.ingredientsChange.next(this.ingredients.slice());

  }
}
