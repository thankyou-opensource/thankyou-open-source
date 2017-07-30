function submit_form(editor, title) {
    var editor_length = editor.getLength(); 
    if (editor_length < 300) {
        alert("This letter must have at least 300 characters");
        return false;
    }
    if ($(".recommend-name").val() == 0) {
        alert("Please enter your name"); 
        return false;
    }

    if ($(".recommend-title").val() == 0) {
        alert("Please enter the title"); 
        return false;
    }

    data = {
        "title": $(".recommend-title").val(),
        "content": JSON.stringify(editor.getContents()),
        "name": $(".recommend-name").val(),
        "repo": title
    }
    var csrftoken = getCookie('csrftoken');
    $.ajax({
        url: "/api/thanks/",
        type: "POST",
        dataType: "JSON",
        data: data,
        cache: true,
        beforeSend: function(xhr) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken)
            },
		success:function(data){
            window.location = host + "/letter/" + data["id"] + "/" + replaceSpace(data["title"]) + "/";
        },
        error: function(data) {
        }
    });
    
}
