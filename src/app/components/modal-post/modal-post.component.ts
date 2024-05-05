import { Component, Inject, EventEmitter } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { Post } from '@models/post.model';
import { ModalActionService } from '@service/modal-action.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark, faFloppyDisk, faTrash, faPen, faComment } from '@fortawesome/free-solid-svg-icons';
import { ModalCommentComponent } from '@components/modal-comment/modal-comment.component';
import { CommentService } from '@service/comment.service';

@Component({
  selector: 'app-modal-post',
  standalone: true,
  imports: [FormsModule, MatDialogContent, FontAwesomeModule],
  templateUrl: './modal-post.component.html',
  styleUrl: './modal-post.component.css'
})
export class ModalPostComponent {

  // ICONS
  faXmark = faXmark;
  faFloppyDisk = faFloppyDisk;
  faTrash = faTrash;
  faPen = faPen;
  faComment = faComment;
  isNewPost = true;

  post: Post;

  dialogRefComment: any;

  constructor (public dialogRef: MatDialogRef<ModalPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private modalActionService: ModalActionService,
              private dialog: MatDialog,
              private commentService: CommentService) {
    this.post = {...data.post};
    this.isNewPost = data.isNewPost;
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  addClick(): void {
    this.modalActionService.addPostAction(this.post);
  }

  updateClick(): void {
    this.modalActionService.updatePostAction(this.post);
  }

  deleteClick(): void {
    this.modalActionService.deletePostAction(this.post);
  }

  openCommentDialog(event: Event) {
    event.preventDefault();
    this.isNewPost = false;
    this.dialogRefComment = this.dialog.open(ModalCommentComponent, {
      data: {post: this.post},
    });

    this.dialogRefComment.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

}
