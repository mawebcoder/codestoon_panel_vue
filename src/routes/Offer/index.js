export default [
    {
        path: 'offers',
        component: () => import('../../views/Offer/index'),
        children: [
            {
                path: 'list',
                component: () => import('../../views/Offer/list'),
                name: 'offer-list'
            }
        ]
    }
]