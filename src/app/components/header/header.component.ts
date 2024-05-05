import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart, faXmark, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { ModalActionService } from '@service/modal-action.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  faXmark = faXmark;
  faSearch = faSearch;
  faHeart = faHeart;
  faUser = faUser;
  faBars = faBars;
  searchString = '';

  isShowingMobileMenu = false;

  constructor (private modalActionService: ModalActionService) {}

  public closeMobileMenu(): void {
    this.isShowingMobileMenu = false;
  }

  public showMobileMenu(): void {
    this.isShowingMobileMenu = true;
  }

  clickAddPost(event: Event): void {
    event.preventDefault();
    this.modalActionService.showAddPostModalAction();
  }

  triggerSearch(e: Event){
    e.preventDefault();
    this.modalActionService.searchPostEvent(this.searchString);
  }

}
