import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MediasService } from "../../services/api/medias.service";
import { Helpers } from "../../../helpers";

@Component({
    selector: 'app-image-selector',
    templateUrl: './image-selector.component.html',
    styleUrls: ['./image-selector.component.css'],
})
export class ImageSelectorComponent implements OnInit {
    @Output() addIamge: EventEmitter<any> = new EventEmitter();
    @Output() uploadImage: EventEmitter<FormData> = new EventEmitter();
    public searching = false;
    public filters: any = {
        limit: 50,
        offset: 0,
        q: ''
    };
    public images: any = [];
    constructor(public mediasService: MediasService) { }

    ngOnInit() {
        this.getImages();
    }

    getImages() {
        this.searching = true;
        this.mediasService.list(this.filters).subscribe(medias => {
            this.images = this.images.concat(...medias.json().data.results);
            console.log(this.images);
            this.filters.offset++;
            this.searching = false;
        });
    }

    onAddImage(image) {
        this.addIamge.emit(image);
    }

    uploadAndSelectImage(event) {
        if (event.target.files && event.target.files[0]) {
            this.saveImage(event.target.files[0]);
        }
    }

    /**
     * upload image to api server
     *
     * @param image
     */
    saveImage(image: File) {
        const formData: FormData = new FormData;
        formData.append('imagen', image);
        formData.append('is_thumbnail', '0');
        console.log(formData);
        this.uploadImage.emit(formData);
    }

    onSearch() {
    }
}
