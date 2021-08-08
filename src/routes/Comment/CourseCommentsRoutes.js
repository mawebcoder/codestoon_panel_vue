export default [
    {
        path: 'courses',
        component: () => import('../../views/Comment/Course/index'),
        children: [
            {
                path: 'list',
                component: () => import('../../views/Comment/Course/list'),
                name: 'comment-course-list'
            }
        ]
    }
]