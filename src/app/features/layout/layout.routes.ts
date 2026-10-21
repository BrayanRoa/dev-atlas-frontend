import { Routes } from "@angular/router";

export const LayoutRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import("./pages/layout-pages/layout-pages").then(m => m.LayoutPages),
        children: [
            {
                path: 'topics',
                loadComponent: () => import("../topics/pages/topic-empty/topic-empty").then(m => m.TopicEmpty),
            },
            {
                path: 'topics/:id',
                loadComponent: () => import("../topics/pages/topic-detail/topic-detail").then(m => m.TopicDetail),
            },
            {
                path: 'tags',
                loadComponent: () => import("../tags/pages/tags-pages/tags-pages").then(m => m.TagsPages),
            },
            {
                path: '**',
                redirectTo: 'topics',
            }
        ]
}]