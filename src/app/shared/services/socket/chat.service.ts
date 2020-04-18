import { Injectable } from "@angular/core";
import WS from "../../../../assets/js/gos_web_socket_client.js";
import { environment } from "../../../../environments/environment";
import { ScriptLoaderService } from "../../../_services/script-loader.service";
import { NotificationService } from "./notification.service";

const CHAT_URL = environment.CHAT_URL;

export interface Message {
  message: any[];
}

@Injectable()
export class ChatService {
  constructor(
    private _script: ScriptLoaderService,
    private notificationService: NotificationService
  ) {}

  initChat() {
    let webSocket = WS.connect(CHAT_URL);
    let self = this;
    //session is an Autobahn JS WAMP session.
    webSocket.on("socket/connect", function(session) {
      console.log("Successfully Connected!");
      session.subscribe(
        `notifications/user/${localStorage.getItem("access_token")}`,
        function(uri, payload) {
          self.notificationService.handleNotification(payload, true);
        }
      );
    });

    //error provides us with some insight into the disconnection: error.reason and error.code
    webSocket.on("socket/disconnect", function(error) {
      console.log(
        "Disconnected for " + error.reason + " with code " + error.code
      );
    });
  }
}
