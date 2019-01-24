import { EventEmitter, Input, OnInit, Output, ViewContainerRef } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
export abstract class BaseDatatableComponent implements OnInit {
    @Input() data: any[];
    @Input() totalItems: number;
    @Input() filters: any;
    public numsPerPage: any[];
    public page: number;
    public registroInicialPagina: number;
    public registroFinalPagina: number
    @Output() update: EventEmitter<string | number> = new EventEmitter();
    @Output() delete: EventEmitter<string | number> = new EventEmitter();
    @Output() view: EventEmitter<string | number> = new EventEmitter();
    @Output() filtersChange: EventEmitter<any> = new EventEmitter();

    constructor(private modalService: NgbModal) {
        this.numsPerPage = [5, 10, 20, 40, 100];
    }

    ngOnInit() {
    }


    onUpdate(id: string | number) {
        console.log(id);
        this.update.emit(id);
    }

    onView(id: string | number) {
        this.view.emit(id);
    }

    onPageChange() {
        this.filters.offset = this.page - 1;
        this.filtersChange.emit(this.filters);
    }

    onLimitChange() {
        this.filters.offset = 0;
        this.filtersChange.emit(this.filters);
    }

    onDelete(content, id) {
        this.modalService.open(content).result.then((result) => {
            if (result == 'aceptar') {
                this.delete.emit(id);
            }
        });
    }
}
