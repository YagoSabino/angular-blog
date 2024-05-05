import { Component, OnInit } from '@angular/core';
import { PostService } from '@service/post.service';
import { Post } from '@models/post.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ModalPostComponent } from '@components/modal-post/modal-post.component';
import { ModalActionService } from '@service/modal-action.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  faMap = faMap;
  posts: Post[] = []; //ARRAY WICH STORE ALL 'IN MEMORY' POSTS
  filteredPosts: Post[] = [];
  filteredPostsCount = 0;
  isNewPost = true;
  dialogRef: any;
  currentSearchString = '';

  constructor(private postService: PostService, public dialog: MatDialog, private modalActionService: ModalActionService) {
    this.createModalActions();
  }

  ngOnInit(): void {
    this.populate();
  }

  listAll() {
    this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
      this.filteredPosts = posts;
      this.filteredPostsCount = posts.length;
    });
  }

  addPost(post: Post) { //A API não persiste os dados, sendo assim o novo registro ficará apenas "in memory"
    this.postService.newPost(post).subscribe((response) => {
      this.addInMemoryPost(response);
      this.dialogRef.close();
      this.filteredPosts = this.filterPosts(this.currentSearchString);
    });
  }

  updatePost(post: Post) {
    this.postService.updatePost(post).subscribe((response: Post) => {
      this.updateInMemoryPost(response);
      this.dialogRef.close();
      this.filteredPosts = this.filterPosts(this.currentSearchString);

    });
  }

  deletePost(post: Post) {
    this.postService.deletePost(post.id).subscribe((response) => {
      this.deleteInMemoryPost(post);
      this.dialogRef.close();
      this.filteredPosts = this.filterPosts(this.currentSearchString);
    });
  }

  populate() {
    this.listAll();
  }

  filterPosts(searchString: string): Post[] {

    const arr = this.posts.filter(item => {
      return item.title.toLowerCase().includes(searchString.toLowerCase());
    });
    this.filteredPostsCount = arr.length;
    return arr;
  }

  //MODAL SECTION

  //SHOW POST MODAL IN UPDATE MODE
  openPostDialog(event: Event, post: Post) {
    event.preventDefault();
    this.isNewPost = false;
    this.dialogRef = this.dialog.open(ModalPostComponent, {
      data: {
        post: post,
        isNewPost: this.isNewPost,
      },
    });

    this.dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  createModalActions(): void{

    //POST MODAL UPDATE ACTION
    this.modalActionService.updatePost.subscribe((post: Post) => {
      if (confirm('Do you realy want update this post ?')) {
        this.updatePost(post);
      }
    }); 

    //POST MODAL ADD ACTION
    this.modalActionService.addPost.subscribe((post: Post) => {
      this.addPost(post);
    });

    //POST MODAL DELETE ACTION
    this.modalActionService.deletePost.subscribe((post: Post) => {
      if (confirm('Do you realy want delete this post ?')) {
        this.deletePost(post);
      }
    });

    //SEARCH POST
    this.modalActionService.searchPost.subscribe((searchString: string) => {
      this.currentSearchString = searchString;
      this.filteredPosts = this.filterPosts(searchString);
    });

    //SHOW POST MODAL IN INSERT MODE
    this.modalActionService.showAddPostModal.subscribe(() => {
      this.isNewPost = true;
      this.dialogRef = this.dialog.open(ModalPostComponent, {
        data: {
          post: {},
          isNewPost: this.isNewPost,
        }
      });

      this.dialogRef.afterClosed().subscribe(() => {
        console.log('The dialog was closed');
      });
    });
  }

  // 'IN MEMORY' FUNCTIONS

  updateInMemoryPost(post: Post): void {
    let arrayIndex = this.posts.findIndex(item => item.id === post.id);
    if (arrayIndex !== -1) {
      this.posts[arrayIndex] = {...post};
    }
  }
  
  // ADD A NEW POST IF THE RETURNED ID IS A NEW ONE. OTHERWISE THE 'IN MEMORY' WILL BE UPDATED
  addInMemoryPost(post: Post): void{
    let arrayIndex = this.posts.findIndex(item => item.id === post.id);
    if (arrayIndex !== -1) {
      this.posts[arrayIndex] = {...post};
    }else {
      this.posts.push(post);
    }
  }

  deleteInMemoryPost(post: Post): void{
    let arrayIndex = this.posts.findIndex(item => item.id === post.id);
    if (arrayIndex !== -1) {
      this.posts.splice(arrayIndex, 1);
    }
  }

}
