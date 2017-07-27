var host = "http://"+ window.location.hostname + ":8000";
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + "=")) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function get_repo_details(title) {
    author = title.split("/")[0];
    repo = title.split("/")[1];
    url = "https://api.github.com/search/repositories?q=user:" + author + "+" + repo + " in:name&sort=stars&order=desc"
    $.ajax({
        url: url,
        type: "GET",
        dataType: "JSON",
		success:function(data){
            if (data["items"][0]["description"] == null) {
                var des = "Description Is Empty";
            }
            else {
                var des = data["items"][0]["description"];
            }
            $(".say-thank-details").text(des);
            $("#say-thank-a").attr("href", data["items"][0]["html_url"]);
        },
    });
}

function check_repo(btn, repo) {
    btn.on("click", function(){
        if ($(repo).length <= 0){
            alert("Please choose a repo first.");
            return false;
        }
    });
}
