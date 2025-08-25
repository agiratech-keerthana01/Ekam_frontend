import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Employer } from './employer';
import { Home } from './components/home/home';
import { PostJob } from './components/post-job/post-job';

const routes: Routes = [

  {path: '', component: Employer,
    children: [
      {path: 'home', component: Home},
      {path: 'post-job', component: PostJob},
    ]
  }

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
