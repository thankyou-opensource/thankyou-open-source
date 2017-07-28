function get_thanks_list(repo, container) {
    $.ajax({
        url: "/api/thanks/?repo=" + repo,
        type: "GET",
        dataType: "JSON",
        cache: true,
		success:function(data){
            set_content(data["results"], container);
        },
    });
}

function get_all_thanks_list(container) {
    $.ajax({
        url: "/api/thanks/?limit=10",
        type: "GET",
        dataType: "JSON",
        cache: true,
		success:function(data){
            set_content(data["results"], container);
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
        var $editor_title_a = $("<a />", {
            "class": "editor-title-a",
            "href": host + "/letter/" + v["id"] + "/" + replaceSpace(v["title"]) + "/"
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
        $editor_title_a.append($editor_title_span);
        $editor_title_div.append($editor_title_a);
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

function click_like(container) {
    container.on("click", ".editor-likes-i", function(event){
        var raw_id = event.target.id;
        id = raw_id.split("-")[1];
        var csrftoken = getCookie('csrftoken');
        $.ajax({
            url: "/likes/" + id + "/",
            type: "POST",
            dataType: "JSON",
            data: {"likes": id},
            beforeSend: function(xhr) {
                    xhr.setRequestHeader("X-CSRFToken", csrftoken)
                },
            success:function(data){
                var id = data["id"];
                $("#likes-" + id).css("color", "#e35336");
                likes_count = $("#likes-" + id).parent().children(".editor-likes-count");
                likes_count_text = Number(likes_count.text()) + 1;
                $("#likes-" + id).parent().children(".editor-likes-count").text(likes_count_text);
                likes_count.css("color", "#e35336");

            },
            error: function(data) {
            }
        });
    });
    
}

function slick_init() {
    $('.responsive').slick({
        dots: true,
        infinite: false,
        speed: 300,
        adaptiveHeight: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    });
}

function update_click_url(title) {
    $("#list-btn-w").attr("href", host + "/thanks/" + title + "/");
}
