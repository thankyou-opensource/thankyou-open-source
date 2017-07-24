function submit_form(editor) {
    var editor_length = editor.getLength(); 
    if (editor_length <= 1) {
        alert("The letter can't be empty");
    }
    if ($("#get-recommend").prop("checked")) {
        if ($(".recommend-email").val() == 0) {
            alert("Please enter your email"); 
        }
    } 
    if ($(".recommend-name").val() == 0) {
        alert("Please enter your name"); 
    }

    if ($(".recommend-title").val() == 0) {
        alert("Please enter the title"); 
    }

    data = {
        "title": $(".recommend-title").val(),
        "content": JSON.stringify(editor.getContents()),
        "email": $(".recommend-email").val(),
        "name": $(".recommend-name").val(),
        "repo": "123"
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
            console.log(data);
        },
        error: function(data) {
            console.log(responseText); 
        }
    });
    
}
