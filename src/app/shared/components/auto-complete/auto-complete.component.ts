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
    @Input() isModal: boolean = false;
    mostrarInput = false;
    itemsShowing: any[] = [];
    showing = false;
    //items to select
    @Input() items: any[] = [];
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    //selected value
    selected: any = '';
    //the value of the select
    @Input() valueField: string = '';
    //the text field for showing
    @Input() textField: string = '';
    @Input() textField1: string = '';
    @Input() textField2: string = '';
    constructor(public renderer: Renderer2) {
    }

    ngOnInit() {
        if (this.inputText) {
            this.showing = true;
            const element = this.renderer.selectRootElement('#inputFilter');
            setTimeout(() => element.focus(), 0);
        }
        this.items.forEach(it => {
            this.itemsShowing.push(it);
        });
    }

    mostrarInputClick(){
        if(this.mostrarInput)
            this.mostrarInput = false;
        else
            this.mostrarInput = true;
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
                this.selected = it[this.valueField];
                 this.inputText = it[this.textField] + '- ' + it[this.textField1];
                if(it[this.textField2])
                   this.inputText = this.inputText + ' ' + it[this.textField2]; 
            }
        });
    }

    registerOnTouched() { }

    showDropdown() {
        this.showing = true;
    }

    hideModalDropdown(){
        if( this.showing)
            this.showing = false;
        else
            this.showing = true;
    }

    selectItem(item) {
      //  this.selected=null;
        this.selected = item[this.valueField];
     /*    if(item)
            this.selected = item;
        else
            this.selected = ''; */
        this.inputText = item[this.textField] + '- ' + item[this.textField1];
        if(item[this.textField2])
            this.inputText = this.inputText + ' ' + item[this.textField2]; 
        this.onTextChange();
        this.propagateChange(this.selected);
        this.change.emit(this.selected);
    }
    onTextChange() {
        this.itemsShowing = [];
        this.items.forEach(item => {
            if(!item[this.textField2]) item[this.textField2] = '';
            if ((item[this.textField]+'-').toLowerCase().includes(this.inputText.toLowerCase()) || item[this.textField1].toLowerCase().includes(this.inputText.toLowerCase()) || item[this.textField2].toLowerCase().includes(this.inputText.toLowerCase())) {
                this.itemsShowing.push(item);
            }
        });
        this.propagateChange(null);
        this.inputTextChange.emit(this.inputText);
    }

    hideDropdown() {
        setTimeout((time) => {
            this.showing = false;
        }, 100);

    }
}
