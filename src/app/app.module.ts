import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule, MdNativeDateModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';

import { PollsService } from './services/polls.service';
import { RouteStateService } from './services/route-state.service';
import { AppComponent } from './app.component';
import { ListPollsComponent } from './components/list-polls/list-polls.component';
import { NewPollComponent } from './components/new-poll/new-poll.component';
import { ViewPollComponent } from './components/view-poll/view-poll.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { OopsDatepickerComponent } from './components/oops-datepicker/oops-datepicker.component';

const routes: Routes = [
  {
    path: 'view/:id',
    component: ViewPollComponent
  },
  {
    path: '',
    redirectTo: 'new',
    pathMatch: 'full'
  },
  {
    path: 'polls',
    component: ListPollsComponent
  },
  {
    path: 'new',
    component: NewPollComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    ListPollsComponent,
    NewPollComponent,
    ViewPollComponent,
    AutofocusDirective,
    OopsDatepickerComponent
  ],
  imports: [
    HttpClientModule,
    NgxChartsModule,
    MdNativeDateModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpModule,
    BrowserModule
  ],
  providers: [
    DatePipe,
    RouteStateService,
    PollsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
