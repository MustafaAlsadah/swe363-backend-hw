function showComments(recipe_id){
    fetch(`/recipes/${recipe_id}/comments`).then(res=> res.json()).then(res=>{
        let commentsOutput = document.getElementById("comments-output");
        let commentsOutputContent = document.createElement("div");
        for(let comment of res){
            commentsOutputContent.innerHTML += `
                                <blockquote class="comment comment-field-input">
                                    ${comment.comment}
                                    <br>
                                    - ${comment.author}  
                                </blockquote>
            `; 
        }
        commentsOutput.innerHTML=commentsOutputContent.innerHTML;
    });
}
     
function seeComments(recipe_id){  
    const commentsContainer = document.getElementById("comments-container");
    commentsContainer.style.display = "block";
    showComments(recipe_id);
}

function sendComment(recipe_id){
    let author = document.forms['cmt-form']["name-input"].value;
    let commentText = document.forms['cmt-form']["comment-input"].value;
    let data = {
        author: author,
        comment: commentText
    }
    fetch(`/recipes/${recipe_id}/comments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }
    ).then((s)=>{
        showComments(recipe_id);
    });
}

const commentsBtn = document.getElementById("cmts-btn");

commentsBtn.onclick = function(){
    seeComments(parseInt(commentsBtn.dataset.rid))
};
 
const commentsFormSubmitBtn = document.getElementById("submit-comment-btn");
commentsFormSubmitBtn.onclick = function(e){
    sendComment(parseInt(commentsBtn.dataset.rid))
}


