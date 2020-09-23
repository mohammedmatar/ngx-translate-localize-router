import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {Location} from '@angular/common';
import {AppComponent} from './app.component';
import {WelcomeComponent} from './welcome/welcome.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {RouterModule, Routes} from '@angular/router';
import {LocalizeRouterModule} from '../../../ngx-translate-router/src/lib/localize-router.module';
import {LocalizeParser} from '../../../ngx-translate-router/src/lib/localize-router.parser';
import {LocalizeRouterHttpLoader} from '../../../ngx-translate-router/src/lib/http-loader';
import {LocalizeRouterSettings} from '../../../ngx-translate-router/src/lib/localize-router.config';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const routes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'lazy', loadChildren: () => import('./lazy/lazy.module').then(m => m.LazyModule)},
  {path: 'welcome', component: WelcomeComponent, data: {skipRouteLocalization: true}}
];

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    RouterModule.forRoot(routes),
    LocalizeRouterModule.forRoot(routes, {
      parser: {
        provide: LocalizeParser,
        useFactory: (translate, location, settings, http) =>
          new LocalizeRouterHttpLoader(translate, location, settings, http),
        deps: [TranslateService, Location, LocalizeRouterSettings, HttpClient]
      },
      alwaysSetPrefix: false,
      useCachedLang: false,
      defaultLangFunction: (languages: string[], cachedLang?: string, browserLang?: string) => 'en'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
