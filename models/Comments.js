// Model - Data Management
class CommentModel {
    constructor() {
        this.comments = {};
    }

    addComment(articleId, comment) {
        if (!this.comments[articleId]) {
            this.comments[articleId] = [];
        }
        this.comments[articleId].push(comment);
    }

    getComments(articleId) {
        return this.comments[articleId] || [];
    }
}
const commentModel = new CommentModel();
class CommentView {
    constructor() {this.commentLists = {};}

    init(articleId) {
        this.commentLists[articleId] = document.getElementById(`comments-list-${articleId}`);
    }

    displayComments(articleId, comments) {
        const commentList = this.commentLists[articleId];
        commentList.innerHTML = "";
        comments.forEach(comment => {
            const listItem = document.createElement("li");
            listItem.textContent = comment;
            commentList.appendChild(listItem);
        });
    }
}

const commentView = new CommentView();