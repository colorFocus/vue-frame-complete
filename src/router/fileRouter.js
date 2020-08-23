import Layout from "@/components/layout/index.vue";

const fileRouter = {
  path: "/file",
  component: Layout,
  redirect: "/file/list",
  children: [
    {
      path: "list",
      name: "file-list",
      component: () => import("@/views/file/List.vue")
    },
    {
      path: "detail/:id?",
      name: "file-detail",
      props: true,
      component: () => import("@/views/file/Detail.vue")
    }
  ]
};

export default fileRouter;
