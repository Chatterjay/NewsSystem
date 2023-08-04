import Home from "@/views/home/Home.vue"
import Center from "@/views/center/Center.vue"
import UserList from "@/views/user-manage/UserList.vue"
import UserAdd from "@/views/user-manage/UserAdd.vue"
import NewsList from "@/views/news-manage/NewsList.vue"
import NewsAdd from "@/views/news-manage/NewsAdd.vue"
import NewsEdit from "@/views/news-manage/NewsEdit.vue"
import ProductList from "@/views/product-manage/ProductList.vue"
import ProductAdd from "@/views/product-manage/ProductAdd.vue"
import ProductEdit from '@/views/product-manage/ProductEdit.vue'
import NotFount from "@/views/noFount/NotFound.vue"

const routes = [{
    path: '/index',
    component: Home
},
{
    path: '/center',
    component: Center
},
{
    path: '/user-manage/userList',
    component: UserList,
    requireAdmin: true,

},
{
    path: '/user-manage/addUser',
    component: UserAdd,
    requireAdmin: true, // 用于用户等级的路由控制
},
{
    path: '/news-manage/newsList',
    component: NewsList,

},
{
    path: '/news-manage/addNews',
    component: NewsAdd
},
{
    path: '/news-manage/editNews/:id',
    component: NewsEdit
},
{
    path: '/product-manage/productList',
    component: ProductList
},
{
    path: '/product-manage/addProduct',
    component: ProductAdd
},
{
    path: "/product-manage/editProduct/:id",
    component: ProductEdit
},
{
    // 重定向
    path: '/',
    redirect: '/index'
},
{
    // 匹配不存在的路径
    path: '/:pathMatch(.*)*',
    component: NotFount
}
]

export default routes