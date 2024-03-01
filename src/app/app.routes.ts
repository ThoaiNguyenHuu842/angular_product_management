import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'company/:id/products',
        loadComponent: () =>
          import('./components/list-product/list-product.component').then((m) => m.ListProductComponent),
    },
];
