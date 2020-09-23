import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DefaultComponent} from './default/default.component';
import {LocalizeRouterModule} from '../../../../ngx-translate-router/src/lib/localize-router.module';

const routes: Routes = [
  { path: 'default', component: DefaultComponent },
  { path: '', redirectTo: 'default', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes), LocalizeRouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyRoutingModule { }
