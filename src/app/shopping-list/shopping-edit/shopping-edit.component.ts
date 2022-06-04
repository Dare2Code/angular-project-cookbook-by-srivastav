import {Component, ElementRef,  OnInit, ViewChild, OnDestroy} from '@angular/core';
import {IngredientModel} from '../../shared/models/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';



@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  slEditingSubscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: IngredientModel;
 
  constructor( private slService: ShoppingListService) { }

  ngOnInit() {
    this.slEditingSubscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.slService.getIngredient(index);
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        }
      );
  }
  onAddItem(form: NgForm) {
    const value = form.value;

    // grab the name and amount values from the form
    const newIngredient = new IngredientModel(value.name, value.amount);
    
    // if user clicks on an ingredient
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }

    // if user enters a new ingredient without clicking the ingredients.
    else {
      this.slService.addIngredient(newIngredient);
    }

    // Resets the form When the actions are finished
    this.editMode = false;
    this.slForm.reset();
  }

  onClear() {
    // Resets the form When the actions are finished
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    // Call slService to delete an item which has the edited Item Index
    this.slService.deleteIngredient(this.editedItemIndex);
    
    // Reset the edit mode
    this.editMode = false;
    this.slForm.reset();   

  }

  ngOnDestroy(){
    this.slEditingSubscription.unsubscribe();
  }

}
