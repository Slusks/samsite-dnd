import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActionsComponent } from './actions/actions.component';
import { HeaderComponent } from './header/header.component';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { CharactersComponent } from './characters/characters.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MapCompComponent } from './map-comp/map-comp.component';
import { PlayersComponent } from './players/players.component';

import { ProfileComponent } from './AuthenticationPackage/profile/profile.component';
import { RegisterComponent } from './AuthenticationPackage/register/register.component';
import { ProfileResolver } from './AuthenticationPackage/profile/profile.resolver';
import { AuthGuard } from './AuthenticationPackage/core/auth.guard';
import { LoginComponent } from './AuthenticationPackage/login/login.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent,  resolve: { data: ProfileResolver}},
{
  path:'home',
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
},
{
  path:'players',
  component: PlayersComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
