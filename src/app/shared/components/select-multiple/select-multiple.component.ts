import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-select-multiple',
    templateUrl: './select-multiple.component.html',
    styleUrls: ['./select-multiple.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SelectMultipleComponent),
            multi: true
        }
    ]
})
export class SelectMultipleComponent implements OnInit, ControlValueAccessor {
    @Output() inputTextChange: EventEmitter<string> = new EventEmitter();
    inputText: string = '';
    itemsShowing: any[] = [];
    showing = false;
    //items to select
    @Input() items: any[] = [];
    //selected values
    selection: any[] = [];
    //the value of the select
    @Input() valueField: string = '';
    //the text field for showing
    @Input() textField: string = '';
    constructor() {
    }

    ngOnInit() {

    }

    /**
     * Initialize the model
     * @param value
     */
    writeValue(value: any) {
        if (value) {
            this.initialize(value);
        }
    }

    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    initialize(value) {
        value.forEach(item => {
            this.items.forEach(it => {
                if (it[this.valueField] === item[this.valueField]) {
                    this.selection.push(item);
                }
            });
        });
        this.items.forEach(item => {
            this.itemsShowing.push(item);
            this.selection.forEach(it => {
                if (it[this.valueField] === item[this.valueField]) {
                    this.itemsShowing.pop();
                }
            });

        });
    }

    registerOnTouched() { }

    showDropdown() {
        console.log(this.items);
        this.showing = true;
    }

    addItem(item) {
        this.selection.push(item);
        this.onTextChange();
        this.propagateChange(this.selection.map(sel => {
            return sel[this.valueField];
        }));
    }

    removeItem(item) {
        this.selection.splice(this.selection.indexOf(item), 1);
        this.onTextChange();
        this.propagateChange(this.selection.map(sel => {
            return sel[this.valueField];
        }));
    }

    onTextChange() {
        this.itemsShowing = [];
        this.items.forEach(item => {
            if (item[this.textField].toLowerCase().includes(this.inputText.toLowerCase())) {
                this.itemsShowing.push(item);
                this.selection.forEach(it => {
                    if (it[this.valueField] == item[this.valueField])
                        this.itemsShowing.pop();
                });
            }
        });
        this.inputTextChange.emit(this.inputText);
    }

    hideDropdown() {
        setTimeout((time) => {
            this.showing = false;
        }, 100);

    }
}
