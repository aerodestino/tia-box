import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { AuthService } from "../../shared/services/auth/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected authService: AuthService,
        protected router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const isLoggedIn = this.authService.isLoggedIn();
        const now = new Date();
        const expiresDate = new Date(localStorage.getItem('expires_date'));
        const tokenStillValid = (now < expiresDate);

        // console.log(now, expiresDate);
        // console.log(tokenStillValid);

        if (isLoggedIn)
            return isLoggedIn;
        else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}