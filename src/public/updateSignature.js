function updateSignature(id){
    var formData = new FormData($('#update-signature')[0]);
    console.log(formData);
    $.ajax({
        url: '/users/signature/' + id,
        type: 'PUT',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function(result){
            window.location.replace("/users");
        }
    })
};