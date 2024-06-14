import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const useService = inject(UserService)
  const router = inject(Router)

  if(useService.currentUser.token) {
    return true;
  }
  
  return router.navigate(['login'], {queryParams:{returnUrl: state.url}})
 
};
