import type { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken =
    'RYr7q79UjPXHYOvFV4xRtDE7gEm9MCbNsfQqnfDkLNe7myutDTd2d6o6jQZ2';

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
