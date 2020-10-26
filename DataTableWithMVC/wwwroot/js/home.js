    $(document).ready(function () {

        var demoTable = $("#demoGrid").DataTable({

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
                //{ "data": "id", "name": "Id", "title": "Player Id", "autoWidth": true },
                ////{ "data": "name", "name": "Name", "title": "Player Name", "autoWidth": true },
                {
                    "data": "id", "name": "Id", "title": "Player Id", "autoWidth": true, "render": function (data, type, full, meta) {
                        return "<input type='text' class='trackInput' name='id' value='" + full.id + "'>"
                    }
                },
                {
                    "data": "name", "name": "Name", "title": "Player Name", "autoWidth": true, "render": function (data, type, full, meta) {
                        return "<input type='text' id='yo' class='trackInput' name='name' value='" + full.name + "'>"
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
            ],
            "drawCallback": function (settings) {
                $(".trackInput").on("change", function () {
                    var $row = $(this).parents("tr");
                    var rowData = demoTable.row($row).data();

                    //Update the original data property with the new value
                    rowData[$(this).attr('name')] = $(this).val();

                    
                })
            }

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
            //Name: (value.MarkupValue !== undefined) ? value.MarkupValue : value.name,
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
