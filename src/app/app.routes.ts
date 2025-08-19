import { Routes } from '@angular/router';
import { navbar } from './shared/components/navbar/navbar';
import { Hero } from './shared/components/hero/hero';
import { RegisterCandidate } from './shared/components/register-candidate/register-candidate';
import { RegisterEmployer } from './shared/components/register-employer/register-employer';
import { Login } from './shared/components/login/login';
import { authGuard } from './shared/auth-guard';


export const routes: Routes = [

    {path: '', component: navbar, 
        children: [
            { path: '', component: Hero },
            { path: ':role/:mode', component: Login },
            // { path: 'candidate-register', component: RegisterCandidate },
            // { path: 'employer-register', component: RegisterEmployer },
        ]
    },

    { path: 'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)},

];
