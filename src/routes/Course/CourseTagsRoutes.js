export default [
    {
        path: 'tags',
        component: () => import('../../views/Course/Tag/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Tag/create'),
                name: 'course-tag-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Tag/list'),
                name: 'course-tag-list'
            }
        ]
    }
]