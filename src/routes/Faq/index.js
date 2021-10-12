export default [
    {
        path:'faq',
        component:()=>import('../../views/Faq/index'),
        children:[
            {
                path:'create',
                component:()=>import('../../views/Faq/create'),
                name:'faq-create'
            },
            {
                path:'list',
                component:()=>import('../../views/Faq/list'),
                name:'faq-list'
            },
            {
                path:'edit/:id',
                component:()=>import('../../views/Faq/Edit'),
                name:'faq-edit'
            }

        ]
    }
]