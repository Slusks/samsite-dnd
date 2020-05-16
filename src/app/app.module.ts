import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HomepageComponent } from './homepage/homepage.component';
import { ActionsComponent } from './actions/actions.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { SynopsisComponent } from './synopsis/synopsis.component';
import { MatExpansionModule} from '@angular/material/expansion';
import { StoryPanelComponent } from './synopsis/story-panel/story-panel.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { NgPartnersModule } from 'ng-partners';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { NgImageSliderModule } from 'ng-image-slider';
import { MapCompComponent } from './map-comp/map-comp.component';
import { DndDatabaseService } from './dnd-database.service';
import { PlayersComponent } from './players/players.component';
import { PlayerCardComponent } from './players/player-card/player-card.component';

import { AngularFireAuthModule } from '@angular/fire/auth/';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';

import { ProfileComponent } from './AuthenticationPackage/profile/profile.component';
import { RegisterComponent } from './AuthenticationPackage/register/register.component';
import { LoginComponent } from './AuthenticationPackage/login/login.component';
import { DailyspellComponent } from './homepage/dailyspell/dailyspell.component';
import { MatDialogModule } from '@angular/material';
import { HeaderDialogComponent } from './header/header-dialog/header-dialog.component';
import { CantripPipe } from './cantrip.pipe';
import { Factions2Component } from './factions2/factions2.component';







@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    ActionsComponent,
    SynopsisComponent,
    StoryPanelComponent,
    MapCompComponent,
    PlayersComponent,
    PlayerCardComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    DailyspellComponent,
    HeaderDialogComponent,
    CantripPipe,
    Factions2Component


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgPartnersModule,  // https://www.npmjs.com/package/@fortawesome/angular-fontawesome
    NgImageSliderModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    MatCheckboxModule,
    MatDialogModule









  ],
  providers: [
    DndDatabaseService,
    RegisterComponent
  ],
  bootstrap: [AppComponent],

  entryComponents:[HeaderDialogComponent, HomepageComponent, HeaderComponent]
})
export class AppModule { }
