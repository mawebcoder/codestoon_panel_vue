import Article from "./Article/Article";
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
import UserRoutes from './User'
import ReportRoutes from './Report'
import DiscountRoutes from './Discount'
import VipRoutes from './Vip'
import FaqRoutes from './Faq'
import MessageRoutes from './Message'
import RecycleBin from './Recyclebin'

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
            ...ManagerRoutes,
            ...UserRoutes,
            ...ReportRoutes,
            ...DiscountRoutes,
            ...VipRoutes,
            ...FaqRoutes,
            ...MessageRoutes,
            ...RecycleBin,
        ]
    }
];
export default routes;