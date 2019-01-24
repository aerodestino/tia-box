import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
    storagedItems: any[] = [];
    constructor() { }
    setItem(name: string, value: any) {
        console.log(name, value);
        this.storagedItems[name] = value;
    }

    getItem(name: string) {
        return this.storagedItems[name];
    }

    removeItem(name: string) {
        this.storagedItems['name'] = null;
    }

}
