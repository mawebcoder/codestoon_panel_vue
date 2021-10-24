import Auth from "../../services/Auth/Auth";

export default [
    {
        path: 'videos',
        component: () => import('../../views/Video/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Video/create'),
                name: 'video-create',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'video.store', 'آپلود ویدیو جدید')
                }
            },
            {
                path: 'list',
                component: () => import('../../views/Video/list'),
                name: 'video-list',
                beforeEnter: (to, from, next) => {
                    Auth.checkCanAccessThisRoute(next, 'video.index', 'لیست ویدیو های آموزشی ')
                }
            }
        ]
    }
]