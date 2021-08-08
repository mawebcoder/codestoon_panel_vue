export default [
    {
        path: 'sections',
        component: () => import('../../views/Course/Section/index'),
        children: [
            {
                path: 'create',
                component: () => import('../../views/Course/Section/create'),
                name: 'course-section-create'
            },
            {
                path: 'list',
                component: () => import('../../views/Course/Section/list'),
                name: 'course-section-list'
            }
        ]
    }
]