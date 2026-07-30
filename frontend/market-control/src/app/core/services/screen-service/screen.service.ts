import { BreakpointObserver } from '@angular/cdk/layout';
import { inject, Injectable } from '@angular/core';
import { map, Observable, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenService {
  private breakpointObserver = inject(BreakpointObserver);

  readonly isMobile$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 760px)')
    .pipe(
      map((result) => result.matches),
      shareReplay(1),
    );
}
