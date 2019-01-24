import { Component, EventEmitter, Input, OnInit, Output, ViewContainerRef } from '@angular/core';
import { isNullOrUndefined } from "util";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppService } from "../../../../../app.service";
import {Track} from "../../../../../shared/model/track.model";

@Component({
    selector: 'app-track-formulario',
    templateUrl: './track-formulario.component.html',
    styles: []
})
export class TrackFormularioComponent implements OnInit {
    @Output() submitForm: EventEmitter<Track> = new EventEmitter();
    @Output() cancel: EventEmitter<any> = new EventEmitter();
    constructor(public toastr: ToastsManager,
                vcr: ViewContainerRef,
                public appService: AppService) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    onSubmit(track: Track) {
        this.submitForm.emit(track);
    }
    onCancel() {
        this.cancel.emit();
    }

}
