import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'managers',
        component: () => import('../../views/Manager/index'),
        name: 'manager',
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, 'user.index', 'لیست مدیران')
        }
    },
    {
        path: 'managers/edit/:id',
        name:'edit-managers',
        component: () => import('../../views/Manager/Edit'),
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, 'user.update', 'ویرایش مدیر')
        }
    }

]