import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'z3f2wyXekQzkahwiX2PD80W6D2c4g7fe36kXGTcF2sZhPuuSynEqfTeKGEHM';

  if (req.url.includes('/management/api')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken,
      },
    });
    return next(authReq);
  }
  return next(req);
};
