function updateUsers(id){
    // Source: CS 290 database work
    $.ajax({
        url: '/users/' + id,
        type: 'PUT',
        data: $('#update-users').serialize(),
        success: function(result){
            window.location.replace("/users");
        }
    })
};