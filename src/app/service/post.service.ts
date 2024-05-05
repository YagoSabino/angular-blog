import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '@models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url);
  }

  newPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.url, post);
  }

  deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(this.url+'/'+id.toString());
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(this.url+'/'+post.id.toString(), post);
  }
}
