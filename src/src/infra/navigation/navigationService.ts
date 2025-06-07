import type { NavigateFunction } from 'react-router-dom';

class NavigationService {
  private navigate?: NavigateFunction;

  setNavigateFunction(navigateFn: NavigateFunction): void {
    this.navigate = navigateFn;
  }

  navigateTo(path: string, options?: { replace?: boolean }): void {
    if (this.navigate) {
      this.navigate(path, options);
    } else {
      console.warn(
        'NavigationService: navigate function not set. Falling back to window.location.href.'
      );
      if (options?.replace) {
        window.location.replace(path);
      } else {
        window.location.href = path;
      }
    }
  }
}

const navigationService = new NavigationService();
export default navigationService; 