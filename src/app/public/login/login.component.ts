import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../router.animations';
import {DynamoDBService} from "../../shared/services/ddb.service";
import {UserLoginService} from "../../shared/services/user-login.service";
import {ChallengeParameters, CognitoCallback, LoggedInCallback} from "../../shared/services/cognito.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements CognitoCallback, LoggedInCallback, OnInit {
    email: string;
    password: string;
    errorMessage: string;
    mfaStep = false;

    mfaData = {
        destination: '',
        callback: null
    };

    constructor(public router: Router,
                public ddb: DynamoDBService,
                public userService: UserLoginService) {
        console.log("LoginComponent constructor");
    }

    ngOnInit() {
        this.errorMessage = null;
        console.log("Checking if the user is already authenticated. If so, then redirect to the secure site");
        this.userService.isAuthenticated(this);
    }

    onLogin() {
        if (this.email == null || this.password == null) {
            this.errorMessage = "All fields are required";
            return;
        }
        this.errorMessage = null;
        this.userService.authenticate(this.email, this.password, this);
    }

    cognitoCallback(message: string, result: any) {
        this.router.navigate(['/dashboard']);
        if (message != null) { //error
            this.errorMessage = message;
            console.log("result: " + this.errorMessage);
            if (this.errorMessage === 'User is not confirmed.') {
                console.log("redirecting");
                this.router.navigate(['/confirmRegistration', this.email]);
            } else if (this.errorMessage === 'User needs to set password.') {
                console.log("redirecting to set new password");
                this.router.navigate(['/newPassword']);
            }else if (this.errorMessage === 'Missing required parameter USERNAME'){
                this.errorMessage = 'Missing required field USERNAME';
            }
        } else { //success
         //   this.ddb.writeLogEntry("login");
            console.log("TESTS" + this.router.url )
            localStorage.setItem('isLoggedin', 'true');
            this.router.navigate(['/dashboard']);
            console.log("TESTS" + this.router.url )
        }
    }

    handleMFAStep(challengeName: string, challengeParameters: ChallengeParameters, callback: (confirmationCode: string) => any): void {
        this.mfaStep = true;
        this.mfaData.destination = challengeParameters.CODE_DELIVERY_DESTINATION;
        this.mfaData.callback = (code: string) => {
            if (code == null || code.length === 0) {
                this.errorMessage = "Code is required";
                return;
            }
            this.errorMessage = null;
            callback(code);
        };
    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (isLoggedIn) {
            this.router.navigate(['/dashboard']);
        }
    }

    cancelMFA(): boolean {
        this.mfaStep = false;
        return false;   //necessary to prevent href navigation
    }

    onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
    }
}
