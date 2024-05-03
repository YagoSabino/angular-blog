import { Component, OnInit } from '@angular/core';
import { PostService } from '@service/post.service';
import { Post } from '@models/post.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {

  faMap = faMap;
  posts: Post[] = [];

  constructor(private post: PostService) {}

  ngOnInit(): void {
    this.populate();
  }

  listAll() {
    this.post.getAll().subscribe((posts) => {
      this.posts = posts;
      console.log(this.posts);
    });
  }

  populate() {
    this.listAll();
  }

}
