import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-auto-complete',
    templateUrl: './auto-complete.component.html',
    styleUrls: ['./auto-complete.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AutoCompleteComponent),
            multi: true
        }
    ]
})
export class AutoCompleteComponent implements OnInit, ControlValueAccessor {
    @Output() inputTextChange: EventEmitter<string> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Input() inputText: string = '';
    itemsShowing: any[] = [];
    showing = false;
    //items to select
    @Input() items: any[] = [];
    @Input() placeholder: string = '';
    //selected value
    selected: any;
    //the value of the select
    @Input() valueField: string = '';
    //the text field for showing
    @Input() textField: string = '';
    constructor(public renderer: Renderer2) {
    }

    ngOnInit() {
        console.log(this.items);
        if (this.inputText) {
            this.showing = true;
            const element = this.renderer.selectRootElement('#inputFilter');
            setTimeout(() => element.focus(), 0);
        }

        this.items.forEach(it => {
            this.itemsShowing.push(it);
        });
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
        this.items.forEach(it => {
            if (it[this.valueField] === value) {
                this.selected = value;
                this.inputText = it[this.textField];
            }
        });
    }

    registerOnTouched() { }

    showDropdown() {
        this.showing = true;
    }

    selectItem(item) {
        this.selected = item[this.valueField];
        this.inputText = item[this.textField];
        this.onTextChange();
        this.propagateChange(this.selected);
        this.change.emit(item);
    }
    onTextChange() {
        this.itemsShowing = [];
        this.items.forEach(item => {
            if (item[this.textField].toLowerCase().includes(this.inputText.toLowerCase())) {
                this.itemsShowing.push(item);
            }
        });
        this.inputTextChange.emit(this.inputText);
    }

    hideDropdown() {
        console.log(this.selected);
        setTimeout((time) => {
            this.showing = false;
        }, 100);

    }
}
