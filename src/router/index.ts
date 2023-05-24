// @ts-nocheck
import {createRouter, createWebHistory} from "vue-router";
import LoginView from "@/views/LoginView.vue";
import MainView from "@/views/MainView.vue";
import GuildView from "@/views/GuildView.vue";
import DiscoveryView from "@/views/DiscoveryView.vue";
import ChatView from "@/views/ChatView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "main",
            component: MainView,
            children: [
                {
                    path: "/home",
                    name: "home",
                    component: HomeView
                },
                {
                    path: "/discovery",
                    name: "discovery",
                    component: DiscoveryView
                },
                {
                    path: "/channels/:guildId",
                    component: GuildView,
                    children: [
                        {
                            path: ":channelId",
                            name: "channels",
                            component: ChatView
                        }
                    ]
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: LoginView
        }

    ]
});

export default router;

