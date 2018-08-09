function updateSignature(id){
    var formData = new FormData($('#update-signature')[0]);
    console.log(formData);
    $.ajax({
        url: '/users/signature/' + id,
        type: 'PUT',
        data: formData,
        success: function(result){
            window.location.replace("/users");
        },  
        cache: false,
        contentType: false,
        processData: false
    })
};