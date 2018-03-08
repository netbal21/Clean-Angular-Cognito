import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import {ForgotPassword2Component, ForgotPasswordStep1Component} from "./public/forgot/forgotPassword.component";
import {ResendCodeComponent} from "./public/resend/resendCode.component";
import {NewPasswordComponent} from "./public/newpassword/newpassword.component";
import {RegisterComponent} from "./public/register/registration.component";
import {LoginComponent} from "./public/login/login.component";
import {RegistrationConfirmationComponent} from "./public/confirm/confirmRegistration.component";

const routes: Routes = [
    { path: '', loadChildren: './layout/layout.module#LayoutModule', canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'forgot', component: ForgotPasswordStep1Component },
    {path: 'forgotPassword/:email', component: ForgotPassword2Component},
    {path: 'resendCode', component: ResendCodeComponent},
    {path: 'newPassword', component: NewPasswordComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'confirmRegistration/:username', component: RegistrationConfirmationComponent},
/*    { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },*/
    { path: 'error', loadChildren: './server-error/server-error.module#ServerErrorModule' },
    { path: 'access-denied', loadChildren: './access-denied/access-denied.module#AccessDeniedModule' },
    { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
