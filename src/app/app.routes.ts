import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { authGuard } from './features/auth/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes,
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./features/layout/layout.routes').then(m => m.LayoutRoutes),
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];