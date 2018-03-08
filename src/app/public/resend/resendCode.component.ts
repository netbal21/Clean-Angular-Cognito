import {Component} from "@angular/core";
import {CognitoCallback} from "../../shared/services/cognito.service";
import {Router} from "@angular/router";
import {UserRegistrationService} from "../../shared/services/user-registration.service";

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './resendCode.html'
})
export class ResendCodeComponent implements CognitoCallback {

    email: string;
    errorMessage: string;

    constructor(public registrationService: UserRegistrationService, public router: Router) {

    }

    resendCode() {
        this.registrationService.resendCode(this.email, this);
    }

    cognitoCallback(error: any, result: any) {
        if (error != null) {
            this.errorMessage = "Something went wrong...please try again";
        } else {
            this.router.navigate(['/confirmRegistration', this.email]);
        }
    }
}
