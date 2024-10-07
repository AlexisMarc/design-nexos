import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'WBcNqtUc82n4rcesdq55feoRWKrAhxzI354n8QaChGPxMDriLaJyqvsQcaZP';

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
