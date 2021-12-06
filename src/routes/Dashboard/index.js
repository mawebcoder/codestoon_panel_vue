import Auth from "../../services/Auth/Auth";

const Dashboard = () => import('../../views/Dashboard/Dashboard')
export default [
    {
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, 'dashboard.index', 'داشبور مدیریتی')
        }
    }
]