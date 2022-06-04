import {Component, OnDestroy, OnInit} from '@angular/core';
import {IngredientModel} from '../shared/models/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IngredientModel[];
  private slSubscription: Subscription;

  constructor(private slService: ShoppingListService) {
  }

  ngOnInit() {

    // Fetch ingredients
    this.ingredients = this.slService.getIngredients();

    // up on change in ingredientsChange after event emitted, we subscribe to the event
    // and update our ingredients[] with all changes.
    this.slSubscription = this.slService.ingredientsChange
      .subscribe(
        (ingredients: IngredientModel[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy() {
    this.slSubscription.unsubscribe();
  }
  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }
}
