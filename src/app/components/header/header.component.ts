import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faXmark, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faXmark = faXmark;
  faSearch = faSearch;
  faHeart = faHeart;
  faUser = faUser;
  faBars = faBars;

  isShowingMobileMenu = false;

  public closeMobileMenu(): void {
    this.isShowingMobileMenu = false;
  }

  public showMobileMenu(): void {
    this.isShowingMobileMenu = true;
  }

}
