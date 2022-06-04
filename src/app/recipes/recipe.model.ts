import {IngredientModel} from '../shared/models/ingredient.model';

export class RecipeModel {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: IngredientModel[];

  constructor(name: string, ingredients: IngredientModel[], description: string, imagePath: string) {
    this.name = name;
    this.ingredients = ingredients;
    this.description = description;
    this.imagePath = imagePath;
  }
}
