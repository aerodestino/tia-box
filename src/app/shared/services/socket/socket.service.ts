import { Injectable } from '@angular/core';
import { Subject, Observable, Observer } from "rxjs";


@Injectable()
export class SocketService {
    constructor() { }

    private subject: Subject<any>;

    public connect(url): Subject<any> {
        if (!this.subject) {
            this.subject = this.create(url);
            console.log("Successfully connected: " + url);
        }
        return this.subject;
    }

    private create(url): Subject<any> {
        let ws = new WebSocket(url);

        let observable = Observable.create(
            (obs: Observer<any>) => {
                ws.onmessage = obs.next.bind(obs);
                ws.onerror = obs.error.bind(obs);
                ws.onclose = obs.complete.bind(obs);
                return ws.close.bind(ws);
            })
        let observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        }
        return Subject.create(observer, observable);
    }

}