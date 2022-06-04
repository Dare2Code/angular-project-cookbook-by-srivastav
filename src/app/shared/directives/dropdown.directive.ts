import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive ({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  // links to the class where the directive is used and adds 'open' class if isOpen is true.
  @HostBinding ('class.open') isOpen = false;
  // listens to the class where the directive is used.
  // this function is called if the Div section is clicked.
  @HostListener ('click') toggleOpen() {
    // Toggle between true and false every time the div is clicked.
    this.isOpen = ! this.isOpen;
  }
}
