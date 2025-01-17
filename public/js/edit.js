const postId = document.querySelector('input[name"post-id"]').value;

const editHandler = async function(event) {
    event.preventDefault();
    const title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;

    await fetch(`/api/post/${postId}`, {
        method: "put",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });
    document.location.replace("/dashboard");
}
    const deleteHandler = async function() {
        await fetch(`/api/post/${postId}`, {
            method: "DELETE"
        });
        document.location.replace("/dashboard");
    };
    document
    .querySelector("#edit-post-form")
    .addEventListener("submit", editHandler);
    document
    .querySelector("#delete-btn")
    .addEventListener("click, deleteHandler");
