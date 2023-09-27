import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy} from '@angular/router';

export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  public retrieve(): DetachedRouteHandle | null {
    return null;
  }

  public shouldAttach(): boolean {
    return false;
  }

  public shouldDetach(): boolean {
    return false;
  }

  public shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig !== curr.routeConfig;
  }

  public store(): void {
    return;
  }
}
