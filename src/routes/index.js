
import HomePage from "../pages/AbhyaasiHome.vue";
//
import MaximsPage from "../pages/10Maxims.vue";
import MaximPage from "../pages/Maxim.vue";
//
import PracticePage from "../pages/Practice.vue";
import PracticeTypePage from "../pages/PracticeType.vue";
//
import AEIOUPage from "../pages/AEIOU.vue";

export default [
  {
    path: "/",
    component: HomePage
  },
  {
    path: "/maxims/",
    component: MaximsPage
  },{
    path:"/maxims/:maxim",
    component: MaximPage
  },
  {
    path: "/practice/",
    component: PracticePage
  },
  {
    path: "/practice/:practice",
    component: PracticeTypePage
  },
  {
    path: "/aeiou/",
    component: AEIOUPage
  }
]
