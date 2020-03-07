import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { HeaderComponent } from './header/header.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { CharactersComponent } from './characters/characters.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapCompComponent } from './map-comp/map-comp.component';



const routes: Routes = [
{
  path:'',
  component: HomepageComponent
},
{
  path:'factions',
  component: ActionsComponent
},
{
  path:'synopsis',
  component: SynopsisComponent
},
{
  path:'characters',
  component: CharactersComponent
},
{
  path:'Map',
  component: MapCompComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
