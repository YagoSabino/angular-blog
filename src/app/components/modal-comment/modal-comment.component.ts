import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalActionService } from '@service/modal-action.service';
import { faTrash, faComment, faPen, faXmark, faCheck, faBan, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { Comment } from '@models/comment.model';
import { CommentService } from '@service/comment.service';
import { Post } from '@models/post.model';

@Component({
  selector: 'app-modal-comment',
  standalone: true,
  imports: [FormsModule, MatDialogContent, FontAwesomeModule],
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.css'
})
export class ModalCommentComponent {

  faTrash = faTrash;
  faComment = faComment;
  faPen = faPen;
  faXmark = faXmark;
  faCheck = faCheck;
  faBan = faBan;
  faFloppyDisk = faFloppyDisk;
  
  post: Post;
  comments: Comment[] = [];
  updatingComment: Comment = {
    postId: 0,
    id: 0,
    name: '',
    email: '',
    body: '',
  };

  constructor (public dialogRef: MatDialogRef<ModalCommentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private modalActionService: ModalActionService,
    private commentService: CommentService) {
      
      this.post = {...data.post};

      this.commentService.getAllByPost(this.post.id).subscribe((result) => {
        this.comments = result;
      });
    }

    onCloseClick(): void {
      this.dialogRef.close();
    }

    startEditComment(e: Event, comment: Comment) {
      e.preventDefault();
      this.updatingComment = {...comment};
    }

    confirmEditComment(e: Event) {
      e.preventDefault();
      if (confirm('Do you realy want to update this comment ?')) {
        this.commentService.updateComment(this.updatingComment).subscribe((result) => {
          this.updateInMemoryComment(this.updatingComment);
          this.updatingComment = Comment.initComment();
        });
      }
    }

    abortEditComment(e: Event) {
      e.preventDefault();
      this.updatingComment = Comment.initComment();
    }

    deleteComment(e: Event, comment: Comment) {
      e.preventDefault();
      this.updatingComment = Comment.initComment();
      if (confirm('Do you realy want to delete this comment ?')) {
        this.commentService.deleteComment(comment.id).subscribe(() => {
          this.deleteInMemoryPost(comment);
        });
      }
    }

    //'IN MEMORY' FUNCTIONS

    updateInMemoryComment(comment: Comment): void {
      let arrayIndex = this.comments.findIndex(item => item.id === comment.id);
      if (arrayIndex !== -1) {
        this.comments[arrayIndex] = {...comment};
      }
    }

    deleteInMemoryPost(comment: Comment): void{
      let arrayIndex = this.comments.findIndex(item => item.id === comment.id);
      if (arrayIndex !== -1) {
        this.comments.splice(arrayIndex, 1);
      }
    }

}
