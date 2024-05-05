import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '@models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  
  private urlPost = 'https://jsonplaceholder.typicode.com/posts';
  private urlComment = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.urlComment);
  }

  getAllByPost(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.urlPost+'/'+id.toString()+'/comments');
  }

  newComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.urlComment, comment);
  }

  deleteComment(id: number): Observable<Comment> {
    return this.http.delete<Comment>(this.urlComment+'/'+id.toString());
  }

  updateComment(comment: Comment): Observable<Comment> {
    return this.http.put<Comment>(this.urlComment+'/'+comment.id.toString(), comment);
  }
}
