export default [
    {
        path: 'offers',
        component: () => import('../../views/Offer/index'),
        children: [
            {
                path: 'list',
                component: () => import('../../views/Offer/list'),
                name: 'offer-list'
            },
            {
                path: 'edit/:id',
                component: () => import('../../views/Offer/edit'),
                name: 'offer-edit'
            }
        ]
    }
]