import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LazyRoutingModule } from './lazy-routing.module';
import { DefaultComponent } from './default/default.component';
import {LocalizeRouterModule} from '../../../../ngx-translate-router/src/lib/localize-router.module';
import {TranslateModule} from '@ngx-translate/core';


@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    TranslateModule,
    LazyRoutingModule
  ]
})
export class LazyModule { }
