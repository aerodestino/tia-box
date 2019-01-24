import {Injectable} from '@angular/core';
import {SocketService} from "./socket.service";
import {Subject} from "rxjs";
import {map} from "rxjs/operators";
import {ScriptLoaderService} from "../../../_services/script-loader.service";

import WS from "../../../../assets/js/gos_web_socket_client.js";
import {NotificationService} from "./notification.service";
import {environment} from "../../../../environments/environment";
const CHAT_URL = environment.CHAT_URL;

export interface Message {
    message: any[]
}

@Injectable()
export class ChatService {

    constructor(private _script: ScriptLoaderService, private notificationService: NotificationService) {
    }

    initChat() {
        let webSocket = WS.connect(CHAT_URL);
        let self = this;
        //session is an Autobahn JS WAMP session.
        webSocket.on('socket/connect', function(session){
            console.log('Successfully Connected!');
            console.log(localStorage.getItem('access_token'));
            session.subscribe(`notifications/user/${localStorage.getItem('access_token')}`, function(uri, payload){
                self.notificationService.handleNotification(payload, true);
            });
        });

        //error provides us with some insight into the disconnection: error.reason and error.code
        webSocket.on('socket/disconnect', function(error){
            console.log('Disconnected for ' + error.reason + ' with code ' + error.code);
        });

    }
}