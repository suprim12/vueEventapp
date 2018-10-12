import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Detail from '@/components/Detail'
import Create from '@/components/Create'
import Edit from '@/components/Edit'
import Signup from '@/components/auth/Signup'
import Signin from '@/components/auth/Signin'
import firebase from 'firebase'
Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
  
    },
    {
      path: '/:event_id',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/create',
      name: 'Create',
      component: Create,
      meta:{
        requiresAuth:true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin,
      meta:{
        requiresGuest:true
      }
    },
    {
      path: '/edit/:event_id',
      name: 'Edit',
      component: Edit,
      meta:{
        requiresAuth:true
      }
    }
  ]
})

// nav Gard
router.beforeEach((to,from,next)=>{
  // Check For 
  if(to.matched.some(record=>record.meta.requiresAuth)){
    // Check if Logged
    if(!firebase.auth().currentUser){
      next({
        path:'/signin',
        query:{
          redirect: to.fullPath
        }
      })
    }else{
      next();
    }
  }else if(to.matched.some(record=>record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path:'/',
        query:{
          redirect: to.fullPath
        }
      })
    }else{  
      next();
    }
  }else{
    next();
  }
});

export default router;