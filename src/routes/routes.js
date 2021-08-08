import Article from "./Article/Article";
import dashboard from "./dashboard/dashboard";
import AuthenticationRoutes from "./Authenticatin/AuthenticationRoutes";
import CourseRoutes from './Course'
import VideoRoutes from './Video'
import CommentRoutes from './Comment'
import OfferRoutes from './Offer'
import SettingRoutes from './Setting'
import FactorRoutes from './Factor'
import CacheRoutes from './Cache'
import ModuleRoutes from './Module'
import RoleRoutes from './Role'
import PersonalInformation from './PersonalInformation'
import ManagerRoutes from './Manager'

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
            ...CourseRoutes,
            ...VideoRoutes,
            ...CommentRoutes,
            ...OfferRoutes,
            ...SettingRoutes,
            ...FactorRoutes,
            ...CacheRoutes,
            ...ModuleRoutes,
            ...RoleRoutes,
            ...PersonalInformation,
            ...ManagerRoutes
        ]
    }
];
export default routes;