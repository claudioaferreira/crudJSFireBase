                    //   *************************  DATA BASE ALREADY SET         
var firebaseConfig = {
            apiKey: "AIzaSyCrZcdgaZzNY2BdPDafW3AULGi1iK2siK8",
            authDomain: "crudjsfb.firebaseapp.com",
            databaseURL: "https://crudjsfb-default-rtdb.firebaseio.com",
            projectId: "crudjsfb",
            storageBucket: "crudjsfb.appspot.com",
            messagingSenderId: "295552372329",
            appId: "1:295552372329:web:481993da47b6b170771cf8",
            measurementId: "G-0MJ8H8W89Z"
  };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
                    //   *************************  DATA BASE ALREADY SET         

window.onload = inicializar;
var formConvalidaciones;
var refConvalidaciones;
var tbodyTablaConvalidaciones;


function inicializar (){
    formConvalidaciones = document.getElementById("form-convalidaciones");
    formConvalidaciones.addEventListener("submit", enviarConvalidacionAFirebase, false);
    tbodyTablaConvalidaciones = document.getElementById("tbody-tabla-convalidaciones");
    refConvalidaciones = firebase.database().ref().child("equipos");

    mostrarConvalidacionesdeFireBase();
};


function mostrarConvalidacionesdeFireBase(){
    refConvalidaciones.on("value", function(snap){
        var datos = snap.val();
        var filasAMostrar = "";
        for(var key in datos) {
          filasAMostrar +=  "<tr>" + 
                                "<td>" + datos[key].imei + "</td>" +
                                "<td>" + datos[key].cargador + "</td>" +
                                "<td>" + datos[key].cableusb + "</td>" +
                                "<td>" + datos[key].caja + "</td>" +
                                "<td></td>" +
                                '<td>' +
                                '<button class="btn btn-danger borrar" data-convalidacion="' + key + '">' +
                                '<span class="material-icons-two-tone">delete</span>' +
                                '</button>' +
                                '</td>' +
                            "</tr>";
        }
        tbodyTablaConvalidaciones.innerHTML = filasAMostrar;
        if(filasAMostrar != ""){
            var elementosBorrables = document.getElementsByClassName("borrar");
            for (var i = 0; i < elementosBorrables.length; i++) {
            elementosBorrables[i].addEventListener("click", borrarConvalidacionesdeFirebase, false);
            
            }
        }
    });
};

function borrarConvalidacionesdeFirebase(){
    var keyDeConvalidacionABorrar = this.getAttribute("data-convalidacion");
    var refConvalidacionABorrar = refConvalidaciones.child(keyDeConvalidacionABorrar);
            refConvalidacionABorrar.remove();
}

function enviarConvalidacionAFirebase(e){
    e.preventDefault();
    refConvalidaciones.push({
        imei:       e.target.imei.value,
        cargador:   e.target.cargador.value,
        cableusb:   e.target.cableusb.value,
        caja:       e.target.caja.value
    });
    formConvalidaciones.reset();
    
};conteo ()

//CONTEO DE EQUIPOS
function conteo (){
    let cont = firebase.database().ref("equipos");
    cont.once("value")
      .then(function(snapshot) {
        console.log("Cantidad de equipos: " + snapshot.numChildren()); 
        document.getElementById("conteos").innerHTML =  snapshot.numChildren();
      });
}


