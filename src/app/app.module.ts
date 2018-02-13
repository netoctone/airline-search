import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import * as homeComponents from './home/index';
import * as airlinesComponents from './airlines/index';
import * as commonComponents from './common/index';
import * as searchComponents from './search/index';
import * as services from './services/index';
import * as directives from './directives/index';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: homeComponents.HomeComponent },
  { path: 'airlines', component: airlinesComponents.AirlinesComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ].concat(
    Object.values(homeComponents),
    Object.values(airlinesComponents),
    Object.values(commonComponents),
    Object.values(searchComponents),
    Object.values(directives)
  ),
  providers: Object.values(services),
  bootstrap: [AppComponent]
})
export class AppModule { }
