import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'h2Jo1WxfxrgV9Wo3zzK6nx7dU3VbL0dld7hUTUbzQ3raKYoVVl5pf3OsKamX';

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
