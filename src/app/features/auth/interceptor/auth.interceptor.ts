import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";

export const AuthInterceptor: HttpInterceptorFn = (req, next) =>{
    const token = inject(AuthService).token;

    // Si no hay token, se continua la solicitud
    if(!token) {
        return next(req);
    }

    // Si hay token, se agrega al encabezado de la solicitud
    return next(req.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    }))
}