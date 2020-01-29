import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { HeaderComponent } from './header/header.component';
import { SynopsisComponent } from './synopsis/synopsis.component';



const routes: Routes = [
  {
    path:'',
    component: HeaderComponent
  },
{
  path:'actions',
  component: ActionsComponent
},
{
  path:'synopsis',
  component: SynopsisComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
