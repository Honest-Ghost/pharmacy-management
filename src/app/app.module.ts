import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ViewComponent } from './components/view/view.component';
import { ListComponent } from './components/list/list.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './components/auth/auth.component';

@NgModule({
  declarations: [
  ],
  imports: [
    AppComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    ListComponent,
    ReactiveFormsModule,
    BrowserModule,
    AuthComponent,
    RouterModule.forRoot(routes),
  ],
  providers: [],
})
export class AppModule {}
