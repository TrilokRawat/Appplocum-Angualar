import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RoutesRecognized } from '@angular/router';
import { ApiService} from '../../services/api.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentPage: string;

  constructor(private router: Router, private api: ApiService) {
    console.log(router);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const path = window.location.pathname.split('/').join(' ').trim();
				// console.log(window.location.pathname);
				// document.body.className = (path) ? path : 'login';
				    const currentPage = (path) ? path : 'login';
				    const currentPageParts = currentPage.split(' ');
				    this.currentPage = currentPageParts[currentPageParts.length - 1];
      }
    });
}

  ngOnInit(): void {
  }

  onclickLogout() {
    this.api.fetchData('api/users/sign_out', { }, 'DELETE').subscribe(
      res => {
        console.log(res)
      }
    )
    this.router.navigate(['/login'], {queryParams: {
      ver: Math.random().toString(36).substr(2, 5),
      nocache: 1
    }});
    localStorage.clear();
  }

}
