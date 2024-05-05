export class Comment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;

    constructor(postId: number, id: number, name: string, email: string, body: string) {
        this.postId = postId;
        this.id = id;
        this.name = name;
        this.email = email;
        this.body = body;
    }

    static initComment(): Comment {
        return {
            postId : 0,
            id : 0,
            name : '',
            email : '',
            body : '',
        };
    }
}