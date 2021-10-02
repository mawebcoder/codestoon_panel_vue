import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'managers',
        component: () => import('../../views/Manager/index'),
        name: 'manager',
    },
    {
        path: 'managers/edit/:id',
        name:'edit-managers',
        component: () => import('../../views/Manager/Edit'),
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, 'update.update', 'ویرایش مدیر')
        }
    }

]