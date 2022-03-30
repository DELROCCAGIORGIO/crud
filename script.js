

var id;
var nextId = 10006;
var btnModifica = "<button class='btn btn-primary ms-5 modifica' data-bs-toggle='modal' data-bs-target='#modal-modify'>Modifica</button>";
var btnElimina = "<button class='btn btn-danger elimina'>Elimina</button>";
var url= 'http://localhost:8080/employees';

function chiamata(url){
$.ajax({
    url: url,
    dataType: 'json',
    success: function(response){
        console.log(response);
        displayTable(response["_embedded"]["employees"])
    }
  });
}
//una volta che la pagina viene caricata, vengono inseriti gli elementi nella tabella
$(document).ready(

    //displayTable(),
    chiamata(url)
);

function displayTable(data) {
    var dipendente;

    $("tbody").html("");

    $.each(data, function (i, value) {
        dipendente += '<tr>';
        dipendente += '<th scope="row">' + value.id + '</th>';
        dipendente += '<td>' + value.firstName + '</td>';
        dipendente += '<td>' + value.lastName + '</td>';
        dipendente += '<td data-id=' + value.id + '>' + btnElimina + btnModifica + '</td>';
        dipendente += '</tr>';
    });
    $("tbody").append(dipendente);

    $(".modifica").click(function () {
        id = $(this).parent().data("id");

        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                $("#nome-m").val(data[i].firstName);
                $("#cognome-m").val(data[i].lastName);
            }
        }
    });

    $("#modifica").click(function () {
        var nome = $("#nome-m").val();
        var cognome = $("#cognome-m").val();

        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data[i].firstName = nome;
                data[i].lastName = cognome;
            }
        }
        displayTable();
    });

    $(".elimina").click(function () {
        $(this).parents("tr").fadeOut("fast");

        var id = $(this).parent().data("id");

        for (var i = 0; i < data.length; i++) {
            if (id == data[i].id) {
                data.splice(i, 1);
            }
        }
    });
}

$("#aggiungi").click(function () {
    var nome = $("#nome").val();
    var cognome = $("#cognome").val();

    $("#nome").val("");
    $("#cognome").val("");

    //creo un nuovo oggetto
    var dipendente = {
        "id": nextId,
        "birthDate": "",
        "firstName": nome,
        "lastName": cognome,
        "gender": "",
        "hireDate": "",
    }

    //pusho il nuovo oggetto nell'array data
    data.push(dipendente);

    nextId++;

    displayTable();
});