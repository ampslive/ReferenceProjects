    $(document).ready(function () {

        $("#demoGrid").DataTable({

            "searching": false,
            "paging": false,
            "ordering": false,
            "info": false,
            "search": false,

            "ajax": {
                "url": "/Home/LoadData",
                "type": "GET",
                "datatype": "json",
                "dataSrc": "data"
            },

            "columns": [
                { "data": "id", "name": "Id", "title": "Player Id", "autoWidth": true },
                //{ "data": "name", "name": "Name", "title": "Player Name", "autoWidth": true },
                {
                    "data": "name", "name": "Name", "title": "Player Name", "autoWidth": true, "render": function (data, type, full, meta) {
                        return "<input type='text' id='name' name='name' value='" + full.name + "'>"
                    }
                },
                {
                    "data": null, "render": function (data, type, full, meta) {
                        return "<a class='btn btn-info' href='/Home/EditData/" + full.id + "'>Edit</a>";
                    }
                },
                {
                    "data": null, "render": function (data, type, full, meta) {
                        return "<a class='btn btn-info' onclick='edittwo(" + full.id + ")'>Edit Two</a>";
                    }
                }
            ]

        });

        
    });

function edittwo(playerid) {
    alert(playerid);
}  

function SubmitAllRows() {
    alert('Submit all');

    var listOfPlayers = [];

    var data = $("#demoGrid").DataTable().rows().data();

    /*Iterate through rows in datatable*/
    data.each(function (value, index) {

        var player = {
            Id: value.id,
            Name: value.name,
        };

        listOfPlayers.push(player);
    });
    var players = { 'players': listOfPlayers };

    /*Shorter Version for passing data to controller*/
    //$.post("/Home/SaveAllData", players,
    //    function () {
    //        alert('"PassThings()" successfully called.');
    //    });


    $.ajax({
        type: 'POST',
        url: '/Home/SaveAllData',
        data: players,
        success: function (response) {
            alert(response.success);
            alert('successfully called.');
        },
        failure: function (response) {
            alert(response);
        }
    }); 

}
