import VipFactorRoutes from "./VipFactorRoutes";
import CourseFactorsRoutes from "./CourseFactorsRoutes";

export default [
    {
        path: 'factors',
        component: () => import('../../views/Factor/index'),
        children: [
            ...VipFactorRoutes,
            ...CourseFactorsRoutes
        ]
    }
]