import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { TokenStorageService } from './service/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-angular';

  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  showNavbar = false;
  showSidebar = false;

  constructor(
    private token: TokenStorageService, 
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.token.getToken();

    if(this.isLoggedIn) {
      const user = this.token.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbar = 
        this.activatedRoute.firstChild?.snapshot.data.showNavbar !== false;
        this.showSidebar = 
        this.activatedRoute.firstChild?.snapshot.data.showSidebar !== false;
      }
    })
  }

  logout(): void {
    this.token.logout();
    window.location.reload();
  }
}
