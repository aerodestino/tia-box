import {Injectable} from '@angular/core';
import {NotificationsService} from "../api/notifications.service";
import {Router} from "@angular/router";

@Injectable()
export class NotificationService {
    /**
     * Filters for getting notifications list
     * @type {{limit: number; offset: number}}
     */
    filters = {
        limit: 10,
        offset: 0
    };

    /**
     * Whenever notifications ar loading or not
     */
    loadingNotifications: boolean

    /**
     * Quantity of not read notifications
     * @type {number}
     */
    public notReadNotifications = 0;

    /**
     * array used for showing notifications where needed
     * @type {any[]}
     */
    public notifications = [];

    /**
     * Whether user wants to receive notifications or not
     */
    notificationsGranted: boolean;

    constructor(private notificationsService: NotificationsService, private router: Router) {
    }

    /**
     * Method for handling the notification received via WebSocket
     * @param msg
     */
    handleNotification(msg, notif) {
        console.log(msg);
        if(this.notificationsGranted) {
            if(msg.titulo) {
                let audio = new Audio("../../../../assets/sounds/notification.mp3");
                audio.play().then(() => {
                    let notification = new Notification(msg.titulo, {icon: "../assets/img/logo/klogin.png"});
                    let self = this;
                    notification.onclick = function (event) {
                        event.preventDefault();
                        self.handleNotificationClick(msg);
                    }
                });
            }

        }

    }

    /**
     * handles behavior when user clicks notification
     * @param notification
     */
    handleNotificationClick(notification) {
       this.router.navigate([`/notificaciones/${notification.id}`]);
    }

    /**
     * Grants or deny permission to show notifications
     * @param {boolean} isGranted
     */
    setPermission(isGranted: boolean) {
        this.notificationsGranted = isGranted;
    }
}
