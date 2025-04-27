import { Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { TypeaheadWithHttpResourceComponent } from './typeahead-with-http-resource/typeahead-with-http-resource.component';
import { TypeaheadComponent } from './typeahead/typeahead.component';
import { UserParentComponent } from './user-display/user-display.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'counter',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'typeahead',
    component: TypeaheadComponent,
  },
  {
    path: 'typeahead-with-http-resource',
    component: TypeaheadWithHttpResourceComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'user',
    component: UserParentComponent,
  },
];
