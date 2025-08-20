import { Routes } from '@angular/router';
import { Hero } from './shared/components/hero/hero';
import { Login } from './shared/components/login/login';
import { authGuard } from './shared/auth-guard';
import { NavbarComponent } from './shared/components/navbar-component/navbar-component';


export const routes: Routes = [

    { path: 'admin', loadChildren: () => import('./admin/admin-module').then(m => m.AdminModule)},

    {path: '', component: NavbarComponent, 
        children: [
            { path: '', component: Hero },
            { path: ':role/:mode', component: Login },
        ]
    },


];
