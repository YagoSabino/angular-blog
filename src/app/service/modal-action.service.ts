import { Injectable, EventEmitter } from '@angular/core';
import { Post } from '@models/post.model';

@Injectable({
  providedIn: 'root'
})
export class ModalActionService {

  // This Service was Created to implment Custom Events to ModalPost

  constructor() { }

  //MODAL POST ACTIONS
  addPost: EventEmitter<Post> = new EventEmitter<Post>();
  updatePost: EventEmitter<Post> = new EventEmitter<Post>();
  deletePost: EventEmitter<Post> = new EventEmitter<Post>();
  showAddPostModal: EventEmitter<void> = new EventEmitter<void>();

  addPostAction(post: Post) {
    this.addPost.emit(post);
  }
  
  updatePostAction(post: Post) {
    this.updatePost.emit(post);
  }

  deletePostAction(post: Post) {
    this.deletePost.emit(post);
  }

  showAddPostModalAction():void {
    this.showAddPostModal.emit();
  }

  // SEARCH ACTION

  searchPost: EventEmitter<string> = new EventEmitter<string>();

  searchPostEvent(searchString: string) {
    this.searchPost.emit(searchString);
  }


}
