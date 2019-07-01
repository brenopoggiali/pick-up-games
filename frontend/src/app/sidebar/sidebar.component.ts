import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/auth';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'newdashboard', title: 'Dashboard',  icon: 'ti-rocket', class: '' },
    { path: 'grupos', title: 'Grupos',  icon: 'ti-cup', class: '' },
    { path: 'vaquinhas', title: 'Vaquinhas',  icon: 'ti-money', class: '' },
    { path: 'historico', title: 'Meu Histórico',  icon: 'ti-stats-up', class: '' },
    // { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '' },
    // { path: 'user', title: 'User Profile',  icon:'ti-user', class: '' },
    // { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '' },
    // { path: 'typography', title: 'Typography',  icon:'ti-text', class: '' },
    // { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '' },
    // { path: 'maps', title: 'Maps',  icon:'ti-map', class: '' },
    // { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '' },
    // { path: 'upgrade', title: 'Upgrade to PRO',  icon:'ti-export', class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    private user: User;
    constructor(public afAuth: AngularFireAuth){
        this.user = {
            image: localStorage['image'],
            name: localStorage['name'],
            token: localStorage['token'],
            uid: localStorage['uid']
        };
    }
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
    logout(){
        console.log("clicked");
        localStorage['image'] = '';
        localStorage['name'] = '';
        localStorage['token'] = '';
        localStorage['uid'] = '';
        this.user.image = '';
        this.user.name = '';
        this.user.token = '';
        this.user.uid = '';
        this.afAuth.auth.signOut().then(function() {
            localStorage.clear();
            window.location.reload();
        });
    }

}
