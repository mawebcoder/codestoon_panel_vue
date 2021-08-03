import ArticleRoutes from "./ArticleRoutes";
const routes = [
    {
        path: '/panel',
        component: () => import('../views/Panel'),
        children: []
    }
];
let children=routes[0].children;
children.push(ArticleRoutes)

export default routes;