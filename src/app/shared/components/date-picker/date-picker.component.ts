import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements OnInit, ControlValueAccessor {
    @Output() change: EventEmitter<any> = new EventEmitter();
    public inputText: string = '';
    public selectedDate: any = {
        day: 24,
        month: 1,
        year: 2011,
    };
    public showing = false;
    @Input() placeholder: string = '';
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

    initialize(value: Date) {
        this.inputText = value.getFullYear().toString() + '/' + value.getMonth().toString() + '/' + value.getDay().toString()
        this.selectedDate.year = value.getFullYear();
        this.selectedDate.month = value.getMonth();
        this.selectedDate.day = value.getDay();
    }

    registerOnTouched() { }

    showDatePicker() {
        this.showing = true;
    }

    selectDate() {
        this.inputText = this.selectedDate.year.toString() + '/' + this.selectedDate.month.toString() + '/' + this.selectedDate.day.toString();
        console.log(this.selectedDate);
    }
    hideDatePicker() {
        setTimeout((time) => {
            this.showing = false;
        }, 100);

    }
}
