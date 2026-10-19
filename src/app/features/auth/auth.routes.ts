import { LoginComponent } from "./components/login/login";
import { RegisterComponent } from "./components/register/register";

export const authRoutes = [
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
]