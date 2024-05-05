import { Component } from '@angular/core';
import { ModalActionService } from '@service/modal-action.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor (private modalActionService: ModalActionService) {}

  clickAddPost(event: Event): void {
    event.preventDefault();
    this.modalActionService.showAddPostModalAction();
  }
}
