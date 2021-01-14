import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NbButtonModule, NbLayoutModule, NbThemeModule} from '@nebular/theme';
import {BoardComponent} from './board/board.component';
import {SquareComponent} from './square/square.component';
import {GameComponent} from './game/game.component';
import {NbEvaIconsModule} from '@nebular/eva-icons';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    SquareComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NbLayoutModule,
    NbButtonModule,
    NbThemeModule.forRoot({name: 'dark'}),
    NbLayoutModule,
    NbEvaIconsModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent, GameComponent]
})
export class AppModule {
}
