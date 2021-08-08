export default [
    {
        path: 'categories',
        component: () => import('../../views/Course/Category/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Category/create'),
                name: 'course-category-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Category/list'),
                name: 'course-category-list'
            }
        ]
    }
]