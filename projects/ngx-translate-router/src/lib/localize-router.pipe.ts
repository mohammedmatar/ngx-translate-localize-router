import {PipeTransform, Pipe, ChangeDetectorRef, OnDestroy, ViewRef} from '@angular/core';
import {LocalizeRouterService} from './localize-router.service';
import {Subscription} from 'rxjs';
import {equals} from './util';

@Pipe({
  name: 'localize',
  pure: false // required to update the value when the promise is resolved
})
export class LocalizeRouterPipe implements PipeTransform, OnDestroy {
  private value: string | any[] = '';
  private lastKey: string | any[];
  private lastLanguage: string;
  private readonly subscription: Subscription;

  constructor(private localize: LocalizeRouterService, private ref: ChangeDetectorRef) {
    this.subscription = this.localize.routerEvents.subscribe(() => {
      this.transform(this.lastKey);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  /**
   * Transform current url to localized one
   */
  transform(query: string | any[]): string | any[] {
    if (!query || query.length === 0 || !this.localize.parser.currentLang) {
      return query;
    }
    if (equals(query, this.lastKey) && equals(this.lastLanguage, this.localize.parser.currentLang)) {
      return this.value;
    }
    this.lastKey = query;
    this.lastLanguage = this.localize.parser.currentLang;

    /** translate key and update values */
    this.value = this.localize.translateRoute(query);
    this.lastKey = query;
    // if view is already destroyed, ignore firing change detection
    if ((this.ref as ViewRef)?.destroyed) {
      return this.value;
    }
    this.ref.detectChanges();
    return this.value;
  }
}
