import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {CognitoCallback} from "../../shared/services/cognito.service";
import {UserRegistrationService} from "../../shared/services/user-registration.service";


export class RegistrationUser {
    name: string;
    email: string;
   // phone_number: string;
    password: string;
}
/**
 * This component is responsible for displaying and controlling
 * the registration of the user.
 */
@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './registration.html'
})
export class RegisterComponent implements CognitoCallback {
    registrationUser: RegistrationUser;
    router: Router;
    errorMessage: string;

    constructor(public userRegistration: UserRegistrationService, router: Router) {
        this.router = router;
        this.onInit();
    }

    onInit() {
        this.registrationUser = new RegistrationUser();
        this.errorMessage = null;
    }

    onRegister() {
        this.errorMessage = null;
        this.userRegistration.register(this.registrationUser, this);
    }

    cognitoCallback(message: string, result: any) {
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
        } else { //success
            //move to the next step
            console.log("redirecting");
            console.log(this.router.url);
            this.router.navigate(['/confirmRegistration', result.user.username]);
            console.log(this.router.url);
        }
    }
}
