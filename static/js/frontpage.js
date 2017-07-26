function check_repo() {
    $(".front-btn").on("click", function(){
        if ($(".repo-name").length <= 0){
            alert("Please choose a repo first.");
            return false;
        }
    });
}
