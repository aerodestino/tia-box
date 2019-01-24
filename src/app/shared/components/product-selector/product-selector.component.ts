import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediasService } from "../../services/api/medias.service";
import { Helpers } from "../../../helpers";
import { ProductosService } from "../../services/api/productos.service";
import { PublicacionesService } from "../../services/api/publicaciones.service";

@Component({
    selector: 'app-product-selector',
    templateUrl: './product-selector.component.html',
    styleUrls: ['./product-selector.component.css'],
})
export class ProductSelectorComponent implements OnInit {
    @Output() addProduct: EventEmitter<any> = new EventEmitter();
    @Input() productService: any;
    @Input() seleccionarTodos = true;
    @Input() taken: any[];
    endOfResults = false;
    public searching = false;
    @Input() filters: any = {
        limit: 20,
        offset: 0,
        skus: '',
        exacta: false,
        q: ''
    };
    public productos: any = [];
    constructor() { }

    ngOnInit() {
        this.getProductos();
    }

    getProductos() {
        this.searching = true;
        this.productService.list(this.filters).subscribe(productos => {
            let items = productos.json().data.results;
            items.forEach(producto => {
                this.taken.forEach(pr => {
                    if (producto.id == pr.id) producto.taken = true;
                });
                if (!producto.taken) this.productos.push(producto);
            });
            console.log(this.productos);
            if (!productos.json().data.results.length) this.endOfResults = true;
            this.filters.offset++;
            this.searching = false;
            if (this.productos.length < 20 && !this.endOfResults) this.getProductos();
        });
    }

    onAddProducto() {
        let selectedProducts = [];
        this.productos.forEach(producto => {
            if (producto.selected) {
                selectedProducts.push(producto)
            }
        });
        this.addProduct.emit(selectedProducts);

    }

    onSearch() {
        this.filters.offset = 0;
        this.productos = [];
        this.filters.exacta = (this.filters.skus != '');
        this.getProductos();

    }
    onScroll() {
        let div = document.getElementById('productosDiv');
        console.log(div.offsetHeight, div.scrollTop, div.scrollHeight);
        if (div.offsetHeight + div.scrollTop >= div.scrollHeight && !this.endOfResults) {
            if (!this.searching)
                this.getProductos();
        }
    }

    selectProducto(producto) {
        producto.selected = producto.selected ? false : true;

    }

    onSelectAll() {
        this.productos.forEach(producto => {
            producto.selected = true;
        });
    }
}
