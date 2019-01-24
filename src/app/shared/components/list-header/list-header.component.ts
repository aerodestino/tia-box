import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-list-header',
    templateUrl: './list-header.component.html',
    styles: []
})
export class ListHeaderComponent implements OnInit {
    @Output() create: EventEmitter<any> = new EventEmitter();
    @Input() filters: any;
    @Output() filtersChange: EventEmitter<any> = new EventEmitter();
    constructor() { }

    ngOnInit() {
    }

    onCreate() {
        this.create.emit();
    }

    onSearch() {
        this.filters.offset = 0;
        this.filtersChange.emit(this.filters);
    }
}
