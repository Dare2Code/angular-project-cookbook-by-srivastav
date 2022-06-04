import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { RecipeModel } from '../recipe.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (parms: Params) => {
          // get the recipe ID and cast to number format
          this.id = +parms['id'];
          // Set editMode to true if there is an ID or else Set it to false
          this.editMode = parms['id'] != null;
          // console.log('Edit Mode: ' + this.editMode);
          // initialize our form with the new changes whenever route parms changes
          this.initForm();
    });
  }

  // responsable for initializing Recipe Form
  // Called whenever our route parms changes
  private initForm() {
    let recipeName = '';
    let recipeImgPath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    
    // Get the recipe details from recipe service and save it locally
    if (this.editMode) {
      // Pass the recipe (to local) based on the id of the recipe we know we are editing
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDescription = recipe.description;
      // Check if the recipe has any ingredients first. 
      // It's possable to have a Recipe without Ingredients!
      if (recipe['ingredients']){
        // Loop through each ingredient from recipe's ingredients array
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(
                ingredient.name,
                Validators.required),
              'amount': new FormControl(
                ingredient.amount,
                [Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)]), 
                // here we do execute the Validators method in curved brackets because it acts like a factory. 
                // it gives us back the configured validator, then it will be used by the angular.
                // to configure it, we are passing a validator here.
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(
        recipeName,
        Validators.required), // only passing the validator.required reference so that the angular will execute this only the time it validates te input.
      'imagePath': new FormControl(
        recipeImgPath,
        Validators.required),
      'description': new FormControl(
        recipeDescription,
        Validators.required),
      'ingredients': recipeIngredients,
    });
  }

  onSubmit(){
    const newRecipe = new RecipeModel(
      this.recipeForm.value['name'],
      this.recipeForm.value['ingredients'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      );
    if (this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
      this.router.navigate(['recipes', this.id]);
    }
    else {
      this.recipeService.addRecipe(newRecipe);
      this.router.navigate(['recipes']);
    }
    
  }

  getRecipeFormControls(){
    const controls = (<FormArray>this.recipeForm.get('ingredients')).controls;
    return controls;
  }

  onAddIngredient(){
    // Cast the ingredients list as a form array and push a form group of inputs
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(
                null,
                Validators.required),
        'amount': new FormControl(
          null, // Form state
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)],
          ),
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['recipes', this.id]);
  }

}
