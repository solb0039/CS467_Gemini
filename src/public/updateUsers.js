function updateUsers(id){
    $.ajax({
        url: '/users/' + id,
        type: 'PUT',
        data: $('#update-users').serialize(),
        success: function(result){
            window.location.replace("/users");
        }
    })
};