import { Routes } from '@angular/router';
import { authRoutes } from './features/auth/auth.routes';
import { LayoutRoutes } from './features/layout/layout.routes';

export const routes: Routes = [
    {
        path: 'auth',
        children: authRoutes,
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./features/layout/layout.routes').then(m => m.LayoutRoutes),
    },
    {
        path: '**',
        redirectTo: 'auth/login'
    }
];