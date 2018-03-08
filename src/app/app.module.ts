import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthGuard} from './shared';
import {DynamoDBService} from "./shared/services/ddb.service";
import {UserLoginService} from "./shared/services/user-login.service";
import {CognitoUtil} from "./shared/services/cognito.service";
import {AwsUtil} from "./shared/services/aws.service";
import {FormsModule} from "@angular/forms";
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/forgot/forgotPassword.component";
import {ResendCodeComponent} from "./public/resend/resendCode.component";
import {RegisterComponent} from "./public/register/registration.component";
import {NewPasswordComponent} from "./public/newpassword/newpassword.component";
import {UserRegistrationService} from "./shared/services/user-registration.service";
import {UseractivityComponent} from "./shared/secure/useractivity/useractivity.component";
import {LoginComponent} from "./public/login/login.component";
import {RegistrationConfirmationComponent} from "./public/confirm/confirmRegistration.component";

// AoT requires an exported function for factories
export function createTranslateLoader(http: HttpClient) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-5/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        AppRoutingModule
    ],
    declarations: [AppComponent,
        UseractivityComponent,
        LoginComponent,
        RegistrationConfirmationComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        ResendCodeComponent,
        RegisterComponent,
        NewPasswordComponent],
    providers: [AuthGuard,
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        UserRegistrationService,
        UserLoginService],

    bootstrap: [
        AppComponent]
})
export class AppModule {
}
