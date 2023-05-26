// @ts-nocheck
import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/login/LoginView.vue'
import MainView from '@/views/MainView.vue'
import GuildView from '@/views/guild/GuildView.vue'
import DiscoveryGuildView from '@/views/discovery/DiscoveryGuildView.vue'
import ChatView from '@/views/message/ChatView.vue'
import HomeView from '@/views/home/HomeView.vue'
import DiscoveryRecommendView from '@/views/discovery/DiscoveryRecommendView.vue'
import DiscoverySearchView from '@/views/discovery/DiscoverySearchView.vue'
import TestView from '@/views/TestView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainView,
      children: [
        {
          path: '/home',
          name: 'home',
          component: HomeView
        },
        {
          path: '/test',
          name: 'test',
          component: TestView
        },
        {
          path: '/discovery-guild',
          name: 'discovery-guild',
          component: DiscoveryGuildView,
          children: [
            {
              path: 'recommend',
              name: 'recommend',
              component: DiscoveryRecommendView
            },
            {
              path: 'search',
              name: 'search',
              component: DiscoverySearchView
            }
          ]
        },
        {
          path: '/channels/:guildId',
          component: GuildView,
          children: [
            {
              path: ':channelId',
              name: 'channels',
              component: ChatView
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    }

  ]
})

export default router

