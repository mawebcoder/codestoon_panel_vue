import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'personal/info',
        component: () => import('../../views/PersonalInfo/index'),
        name: 'personal-info',
        beforeEnter: (to, from, next) => {
            Auth.checkCanAccessThisRoute(next, null, 'ویرایش مشخصات شخصی')
        }
    }
]