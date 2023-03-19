import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/test/hica',
        component: (): unknown => import('@/pages/HicaTestPage.vue'),
    },
    {
        path: '/test/fitts',
        component: (): unknown => import('@/pages/FittsTestPage.vue'),
    },
    {
        path: '/:catchAll(.*)',
        component: (): unknown => import('@/pages/Error404.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
