import Article from "./Article/Article";
import dashboard from "./dashboard/dashboard";
import AuthenticationRoutes from "./Authenticatin/AuthenticationRoutes";
import CourseRoutes from './Course/index'

const routes = [
    {
        path: '/test',
        component: () => import('../views/test')
    },
    ...AuthenticationRoutes,
    {
        path: '/panel',
        component: () => import('../views/Panel'),
        children: [
            ...Article,
            ...dashboard,
            ...CourseRoutes


        ]
    }
];
export default routes;