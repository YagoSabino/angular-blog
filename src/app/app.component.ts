import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogComponent } from '@components/blog/blog.component';
import { HeaderComponent } from '@components/header/header.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BlogComponent, FontAwesomeModule, SidebarComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Desafio';

  faUser = faUser;
  faSearch = faSearch;
  faHeart = faHeart;
  faBars = faBars;
  faXmark = faXmark;
  faMap = faMap;
  

  isShowingMobileMenu = false;

  public closeMobileMenu(): void {
    this.isShowingMobileMenu = false;
  }

  public showMobileMenu(): void {
    this.isShowingMobileMenu = true;
  }
}
