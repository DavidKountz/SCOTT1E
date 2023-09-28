
function toggleComments(articleId) {
    const commentsDiv = document.getElementById(`comments-${articleId}`);
    commentsDiv.style.display = commentsDiv.style.display === "none" ? "block" : "none";
}



function addComment(articleId) {
    const commentInput = document.getElementById(`comment-input-${articleId}`);

    const newComment = commentInput.value;
    commentModel.addComment(articleId, newComment);
    commentView.displayComments(articleId, commentModel.getComments(articleId));

    commentInput.value = "";
}

function initComments(articleId) {
    commentView.init(articleId);
    commentView.displayComments(articleId, commentModel.getComments(articleId));
}