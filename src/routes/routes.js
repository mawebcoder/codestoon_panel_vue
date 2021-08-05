import Article from "./Article/Article";
import dashboard from "./dashboard/dashboard";
const routes = [
    {
        path: '/test',
        component: () => import('../views/test')
    },
    {
        path: '/panel',
        component: () => import('../views/Panel'),
        children: [
            ...Article,
            ...dashboard
        ]
    }
];

export default routes;