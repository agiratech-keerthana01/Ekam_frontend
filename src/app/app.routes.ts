import { Routes } from '@angular/router';
import { navbar } from './shared/components/navbar/navbar';
import { Hero } from './shared/components/hero/hero';
import { RegisterCandidate } from './shared/components/register-candidate/register-candidate';


export const routes: Routes = [

    {path: '', component: navbar, 
        children: [
            { path: '', component: Hero },
            { path: 'candidate-register', component: RegisterCandidate },
        ]
    },

];
