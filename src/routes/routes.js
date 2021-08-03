import Article from "./Article/Article";

const routes = [
    {
        path: '/panel',
        component: () => import('../views/Panel'),
        children: [
            ...Article
        ]
    }
];

export default routes;