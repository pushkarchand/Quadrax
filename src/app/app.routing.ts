import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';



const routes: Routes = [{
    path: ':tenant',
    children: [
        {
            path: '',
            component: SigninComponent,
        },

        {
            path: 'home',
            component: HomeComponent,
        },
        {
            path: 'signin',
            component: SigninComponent,
        },
        {
            path: 'signup',
            component: SignupComponent,
        },
        {
            path: 'forgotpassword/:emailId',
            component: ForgotpasswordComponent
        },
        {
            path: '**',
            component: PagenotfoundComponent,
        },
    ]
}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: []
})

export class AppRoutingModule {
}
