import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: "app-list-header",
  templateUrl: "./list-header.component.html",
  styles: []
})
export class ListHeaderComponent  {
	@Input() filters: any;
	@Input() showCreate = true;

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Output() filtersChange: EventEmitter<any> = new EventEmitter();

  onCreate() {
    this.create.emit();
  }

  onSearch() {
    this.filters.offset = 0;
    this.filtersChange.emit(this.filters);
  }
}
