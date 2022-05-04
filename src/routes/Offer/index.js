import Auth from "../../services/Auth/Auth";
export default [
  {
    path: "offers",
    component: () => import("../../views/Offer/index"),
    children: [
      {
        path: "list",
        component: () => import("../../views/Offer/list"),
        name: "offer-list",
        beforeEnter: (to, from, next) => {
          Auth.checkCanAccessThisRoute(next, "role.index", "لیست ارتباط با ما");
        },
      },
      {
        path: "edit/:id",
        component: () => import("../../views/Offer/edit"),
        name: "offer-edit",
        beforeEnter: (to, from, next) => {
          Auth.checkCanAccessThisRoute(
            next,
            "role.index",
            "ویرایش  ارتباط با ما"
          );
        },
      },
    ],
  },
];
