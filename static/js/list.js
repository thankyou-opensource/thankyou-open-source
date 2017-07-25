function get_thanks_list(repo, container) {
    $.ajax({
        url: "/api/thanks/?repo=" + repo,
        type: "GET",
        dataType: "JSON",
        cache: true,
		success:function(data){
            set_content(data, container);
        },
    });
}

function set_content(data, container) {
    $.each(data, function(k, v) {
        var $editor_wrapper_div = $("<div />", {
            "class": "editor-wrapper-div col-md-10 col-md-offset-1"
        });
        // title
        var $editor_title_div = $("<div />", {
            "class": "editor-title-div"
        });
        var $editor_title_span = $("<span />", {
            "class": "editor-title-span",
            "text": v["title"]
        });
        // name
        var $editor_name_div = $("<div />", {
            "class": "editor-name-div pull-right"
        });
        var $editor_name_span = $("<span />", {
            "class": "editor-name-span",
            "text": v["name"]
        });
        //like
        var $editor_likes_div = $("<div />", {
            "class": "editor-likes-div",
        });
        $editor_likes_div.css("text-align", "right");
        var $editor_likes_i = $("<i />", {
            "class": "fa fa-heart fa-2x editor-likes-i",
            "id": "likes-" + v["id"],
            "aria-hidden": true
        });
        var $editor_likes_count = $("<span />", {
            "class": "editor-likes-count",
            "text": v["likes"]
        });
        // content
        var $editor_content_div = $("<div />", {
            "id": "editor-" + v["id"] ,
        });
        var toolbarOptions = [
            [
                {'align': [] },
                {'list': 'bullet'}, 
            ],
        ];
        var options = {
            readOnly: true,
            theme: 'snow',
            modules: {
                toolbar: toolbarOptions
            },
        };
        $editor_content_div.css("margin-bottom", "40px");
        $editor_title_div.append($editor_title_span);
        $editor_likes_div.append($editor_likes_i);
        $editor_likes_div.append($editor_likes_count);
        $editor_name_div.append($editor_likes_div);
        $editor_name_div.append($editor_name_span);
        $editor_wrapper_div.append($editor_title_div);
        $editor_wrapper_div.append("<hr>");
        $editor_wrapper_div.append($editor_content_div);
        $editor_wrapper_div.append($editor_name_div);
        container.append($editor_wrapper_div);

        var editor = new Quill('#editor-' + v["id"], options);
        editor.setContents(JSON.parse(v["content"]));
    });
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
            $(".say-thank-details").text(data["items"][0]["description"]);
        },
    });
}

function click_like() {
    $(".thank-you-container").on("click", ".editor-likes-i", function(event){
        var raw_id = event.target.id;
        id = raw_id.split("-")[1];
        var csrftoken = getCookie('csrftoken');
        $.ajax({
            url: "/api/thanks/" + id + "/",
            type: "PATCH",
            dataType: "JSON",
            data: "{likes: 1}",
            beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken)
                },
            success:function(data){
            },
            error: function(data) {
            }
        });
    });
    
}
