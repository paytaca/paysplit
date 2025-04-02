const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'how-it-works', component: () => import('pages/HowItWorks.vue') },
      { path: 'session-records', component: () => import('pages/SessionRecords.vue') }, // `SessionRecords` import is not used
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
