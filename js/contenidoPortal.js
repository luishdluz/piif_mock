$(document).ready(function() {

  //Funcion para recuperar el id del libro
  function obtenerParametro(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  //Recupera el id del libro
  const libroSeleccionado = obtenerParametro('libro');

  // Cambiar título fijo según el parámetro
  let titulo = "Seleccione un libro";
  switch(libroSeleccionado) {
    case 'introduccion':
      titulo = "Portal Interactivo de Informacion";
      break;
    case 'mercFin':
      titulo = "Mercados Financieros";
      break;
    case 'reqCapital':
      titulo = "Requerimientos de capital";
      break;
    case 'mercValores':
      titulo = "Mercados de renta fija";
      break;
    case 'tabCalificaciones':
      titulo = "Calificaciones de envío de información";
      break;
    case 'capRecursos':
      titulo = "Captación de recursos";
      break;
    case 'mercRentVar':
      titulo = "Mercado de renta variable";
      break;
    case 'libPer1':
      titulo = "Mi libro personal";
      break;
  }

  $('#titulo-libro-texto').text(titulo);

  $('#btn-hamburguesa').on('click', function() {    
    if ($('#menu-lateral').hasClass('show')) {
      //oculta el menu
      $('#menu-lateral').removeClass('show');
      $('#menu-lateral').toggleClass('oculto');
      $('#contenido-libro').toggleClass('expandido');      
    } else {
      $('#menu-lateral').toggleClass('show');      
      $('#menu-lateral').removeClass('oculto');
      $('#contenido-libro').removeClass('expandido');
      
    }
  });


  // Cerrar menú al hacer clic fuera
  //$(document).on('click', function(e) {
    //if (!$(e.target).closest('#menu-lateral, #btn-hamburguesa').length) {
      //$('#menu-lateral').removeClass('show');
    //}
  //});

  // Toggle expandir/colapsar
  $("#menu-lateral").on("click", ".toggle", function(e) {
    e.stopPropagation(); 
    const li = $(this).closest("li");
    li.toggleClass("expanded");

    // Cambiar símbolo ▸ ▼
    if (li.hasClass("expanded")) {
      $(this).text("▼");
    } else {
      $(this).text("▸");
    }
  });

  // Cargar contenido al hacer clic en nivel 4
  $("#menu-lateral").on("click", ".nivel-4 a", function(e) {
    e.preventDefault();
    const contenidoId = $(this).data("contenido");
    const descripcion = $(this).data("descripcion");

    // Aquí podrías traer contenido dinámico o simular con texto
    //$("#contenido-libro").html(
      //`<h2>${$(this).text()}</h2><p>Contenido cargado para <strong>${contenidoId}</strong>.</p>`
    //);

    $(".seccionSelect").text($(this).text());
    $(".descripcionSelect").text(descripcion);

    $("#menu-lateral").removeClass("show");
  });

  //Buscador de contenido
  // Inicializa: cierra todos los sub-uls y pone icono cerrado
  var $arbol = $('.menu-arbol');
  $arbol.find('ul').hide();
  $arbol.find('.toggle').text('▸');

  // Función auxiliar para resetear al estado cerrado
  function resetArbol() {
    $arbol.find('li').show();
    $arbol.find('ul').hide();            // cierra submenús
    $arbol.find('li').removeClass('open');
    $arbol.find('.toggle').text('▸');    // icono cerrado
    $arbol.find('.highlight').removeClass('highlight');
    $('#mensaje').hide();
  }

  // Toggle expandir/colapsar con delegación
  $arbol.on('click', '.toggle', function (e) {
    e.stopPropagation();
    var $li = $(this).closest('li');
    var $sub = $li.children('ul').first(); // sub-ul inmediato

    if (!$sub.length) return; // nada que abrir

    // usa stop(true,true) para prevenir colas de animaciones
    if ($li.hasClass('open')) {
      $sub.stop(true,true).slideUp(150);
      $li.removeClass('open');
      $(this).text('▸');
    } else {
      $sub.stop(true,true).slideDown(150);
      $li.addClass('open');
      $(this).text('▾');
    }
  });

  // Búsqueda en tiempo real (keyup)
  $('#buscador-menu').on('keyup', function () {
    var texto = $(this).val().toLowerCase().trim();

    // si está vacío, resetear a árbol cerrado
    if (texto === '') {
      resetArbol();
      return;
    }

    // empezar: ocultar todo y limpiar highlights
    $arbol.find('li').hide();
    $arbol.find('.highlight').removeClass('highlight');
    $('#mensaje').remove();

    var encontrado = false;

    // buscar en spans (niveles) y enlaces (nivel-4)
    $arbol.find('> li, li').each(function () {
      // no hacemos nada aquí, el .each de abajo busca textos
    });

    $arbol.find('span, a').each(function () {
      var $this = $(this);
      var text = $this.text().toLowerCase();

      if (text.indexOf(texto) !== -1) {
        encontrado = true;
        $this.addClass('highlight');

        // mostrar este li y todos sus li padres
        $this.closest('li').show();
        $this.parents('li').show();

        // mostrar todas las ul padres para que se vea la jerarquía
        $this.parents('ul').show();

        // marcar iconos/toggles de los ancestros como abiertos
        $this.parents('li').each(function () {
          var $ancestor = $(this);
          $ancestor.addClass('open');
          var $t = $ancestor.children('.toggle').first();
          if ($t.length) $t.text('▾');
        });
      }
    });

    if (!encontrado) {
      // mostrar mensaje "Sin resultados" (solo una vez)
      if ($('#mensaje').length === 0) {
        $arbol.after('<p id="mensaje" style="color:#fff; padding:0.5rem;">Sin resultados</p>');
      } else {
        $('#mensaje').show();
      }
    } else {
      $('#mensaje').hide();
    }
  });

  // Asegurarse que al cargar la página el árbol quede cerrado y navegable
  resetArbol();

  // Expandir todo
$("#btn-expandir").on("click", function () {
  $(".menu-arbol ul").show(); // abre todos los subniveles
  $(".menu-arbol .toggle").text("▾"); // cambia icono
});

// Contraer todo
$("#btn-contraer").on("click", function () {
  $(".menu-arbol ul").hide(); // oculta todos los subniveles
  $(".menu-arbol .toggle").text("▸"); // cambia icono
});

document.addEventListener('DOMContentLoaded', function () {
  const cont = document.querySelector('.contenedor-botones');
  const inner = document.querySelector('.botones-scroll');
  if (!cont || !inner) return;

  function updateAlign() {
    // si el contenido interno es más ancho que el contenedor -> activar left-aligned
    if (inner.scrollWidth > cont.clientWidth) {
      cont.style.justifyContent = 'flex-start';
    } else {
      cont.style.justifyContent = 'center';
    }
  }

  // ejecutar al inicio y al redimensionar
  updateAlign();
  window.addEventListener('resize', updateAlign);

  // si agregas/remueves botones dinámicamente, llama updateAlign() después.
});



/* Graficas */

let chart1, chart2;


chart1 = Highcharts.chart('graficaA', {
    chart: { type: 'column' },
    title: { 
      text: 'Estructura de los derivados vigentes por tipo de instrumento 1/ 3/',
      style: { fontSize: '1rem', fontWeight: 'bold'}
    },
    xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
    yAxis: { title: { text: 'Billones de pesos' } },
    series: [
        { name: 'Swaps', data: [1, 3, 2, 4, 3] },
        { name: 'Futuros', data: [2, 4, 1, 3, 5] },
        { name: 'Forwards', data: [3, 2, 4, 1, 2] },
        { name: 'Opciones y Títulos Opcionales', data: [4, 3, 5, 2, 1] }
    ],
    credits: { enabled: false }
});

chart2 = Highcharts.chart('graficaB', {
    chart: { type: 'column' },
    title: { 
      text: 'Comportamiento de los derivados vigentes por tipo de instrumento 2/ 3/',
      style: { fontSize: '1rem', fontWeight: 'bold'}
    },
    xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
    yAxis: { title: { text: 'Billones de pesos' } },
    series: [
        { name: 'Swaps', data: [2, 4, 1, 5, 3] },
        { name: 'Futuros', data: [3, 1, 4, 2, 5] },
        { name: 'Forwards', data: [5, 2, 3, 1, 4] },
        { name: 'Opciones y Títulos Opcionales', data: [1, 5, 2, 3, 4] }
    ],
    credits: { enabled: false }
});


function cargarGraficas() {
  chart1 = Highcharts.chart('graficaA', {
      chart: { type: 'column' },
      title: { 
        text: 'Estructura de los derivados vigentes por tipo de instrumento 1/ 3/',
        style: { fontSize: '1rem', fontWeight: 'bold'}
      },
      xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
      yAxis: { title: { text: 'Billones de pesos' } },
      series: [
          { name: 'Swaps', data: [1, 3, 2, 4, 3] },
          { name: 'Futuros', data: [2, 4, 1, 3, 5] },
          { name: 'Forwards', data: [3, 2, 4, 1, 2] },
          { name: 'Opciones y Títulos Opcionales', data: [4, 3, 5, 2, 1] }
      ],
      credits: { enabled: false }
  });

  chart2 = Highcharts.chart('graficaB', {
      chart: { type: 'column' },
      title: { 
        text: 'Comportamiento de los derivados vigentes por tipo de instrumento 2/ 3/',
        style: { fontSize: '1rem', fontWeight: 'bold'}
      },
      xAxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
      yAxis: { title: { text: 'Billones de pesos' } },
      series: [
          { name: 'Swaps', data: [2, 4, 1, 5, 3] },
          { name: 'Futuros', data: [3, 1, 4, 2, 5] },
          { name: 'Forwards', data: [5, 2, 3, 1, 4] },
          { name: 'Opciones y Títulos Opcionales', data: [1, 5, 2, 3, 4] }
      ],
      credits: { enabled: false }
  });
}

// Inicializamos al cargar la página
document.addEventListener("DOMContentLoaded", cargarGraficas);

document.getElementById("btnRestablecer").addEventListener("click", function () {
  cargarGraficas();
});

// Botón de mostrar (segundo botón con imagen de mostrar)
document.getElementById("btn-mostrar").addEventListener("click", function () {
    chart1.series.forEach(function (serie) {
        serie.show();
    });
    chart2.series.forEach(function (serie) {
        serie.show();
    });
});

// Botón de ocultar todas las series
document.querySelector('button[data-tooltip="Ocultar series"]').addEventListener("click", function () {
    chart1.series.forEach(function (serie) {
        serie.hide();
    });
    chart2.series.forEach(function (serie) {
        serie.hide();
    });
});

let tooltipActivo = true;

// Botón de tooltip ↔ tabla
document.querySelector('button[data-tooltip="Tooltip"]').addEventListener("click", function () {
    if (tooltipActivo) {
        // 🔴 Apagar tooltips
        chart1.update({ tooltip: { enabled: false } });
        chart2.update({ tooltip: { enabled: false } });

        // Mostrar tabla
        generarTablaDatos();
        document.getElementById("tabla-datos").style.display = "block";

        tooltipActivo = false;
    } else {
        // 🟢 Encender tooltips
        chart1.update({ tooltip: { enabled: true } });
        chart2.update({ tooltip: { enabled: true } });

        // Ocultar tabla
        document.getElementById("tabla-datos").style.display = "none";

        tooltipActivo = true;
    }
});

function generarTablaDatos() {
    const tbody = document.getElementById("tabla-body");
    tbody.innerHTML = ""; // limpiar antes

    // Usamos categorías de la primera gráfica (puedes ajustarlo si difieren)
    const categorias = chart1.xAxis[0].categories;

    categorias.forEach((categoria, i) => {
        let fila = `<tr><td>${categoria}</td>`;

        chart1.series.forEach(serie => {
            fila += `<td>${serie.data[i] ? serie.data[i].y : "-"}</td>`;
        });

        tbody.innerHTML += fila + "</tr>";
    });
}


let referenciasActivas = false;

document.querySelector('button[data-tooltip="Referencias"]').addEventListener("click", function () {
    const divRef = document.getElementById("referencias");
    if (referenciasActivas) {
        divRef.style.display = "none"; // ocultar
        referenciasActivas = false;
    } else {
        divRef.style.display = "block"; // mostrar
        referenciasActivas = true;
    }
});


let visualizacionActiva = false;

// Botón Visualización
document.querySelector('button[data-tooltip="Visualización"]').addEventListener("click", function () {
    const divVis = document.getElementById("visualizacion");
    visualizacionActiva = !visualizacionActiva;
    divVis.style.display = visualizacionActiva ? "block" : "none";
});

// Cambio de tipo de gráfica
document.getElementById("tipoGrafica").addEventListener("change", function () {
    const tipo = this.value;

    // Cambiar todas las series de chart1
    chart1.series.forEach(s => s.update({ type: tipo }, false));
    chart1.redraw();

    // Cambiar todas las series de chart2
    chart2.series.forEach(s => s.update({ type: tipo }, false));
    chart2.redraw();
});



$(".nivel-4 a").on("click", function(e) {
    e.preventDefault(); // si no quieres que haga navegación

    //Oculta el boton de información al mostrar la información en pantalla
    $("#btn-info").hide();

    //Quita seleccion de niveles anteriores al 4
    $(".textoNiv").removeClass("seleccionado-borde");

    // Quitar clase 'seleccionado' de cualquier otro link
    $(".nivel-4").removeClass("seleccionado");

    // Agregar clase 'seleccionado' al link clicado
    $(this).parent().addClass("seleccionado");
  });

  // Opcional: disparar click automático en el primer link al inicio
  const $primerLink = $(".nivel-4 a").first();
  if ($primerLink.length) {
    $primerLink.click();
  }

  $("#btn-expandir").click();

  let favoritoActivo = false;



  $(".textoNiv").on("click", function(e) {
    e.stopPropagation(); 

    //Quita la seleccion de nivel 4
    $(".nivel-4").removeClass("seleccionado");

    //Oculta el boton de información al mostrar la información en pantalla
    $("#btn-info").show();

    // quitar borde de todos
    $(".textoNiv").removeClass("seleccionado-borde");

    // agregar borde al texto clickeado
    $(this).addClass("seleccionado-borde");
  });



  $("#btn-info").on("click", function() {
    const titulo = $(".seleccionado-borde").text(); // Texto del botón
    const descripcion = $(".seleccionado-borde").data("descripcion"); // Contenido de data-descripcion

    $("#modal-libro .modal-titulo").text(titulo);
    $("#modal-libro .modal-descripcion").html(descripcion);
    $("#modal-libro").fadeIn(200);
  });

  // Cerrar al hacer clic en la X
  $("#modal-libro .cerrar").on("click", function() {
    $("#modal-libro").fadeOut(200);
  });

  // Cerrar al hacer clic fuera del contenido
  $(window).on("click", function(e) {
    if ($(e.target).is("#modal-libro")) {
      $("#modal-libro").fadeOut(200);
    }

});


// Abrir modal al dar clic en el botón favorito
  $("#btnGrafFav").click(function(){
    favoritoActivo = !favoritoActivo;
    if(favoritoActivo){
      $(this).css({
            "background-color": "#04b3bb",
            "border-color": "#20385a"
        });
        $(this).attr("data-tooltip", "Quitar de favoritos");
        $("#modal-dashboard").fadeIn(200);
    }else {
        $(this).css({
            "background-color": "#F5F6FA",
            "border-color": "#04b3bb"
        });
        $(this).find("img").attr("src", "img/favorito.png");
        $(this).attr("data-tooltip", "Agregar a favoritos");

        // Mostrar toast
        showToast("Gráfica removida de favoritos", "info");
    }
      
  });

  // Cerrar modal
  $("#modal-dashboard .cerrar").click(function(){
    $("#modal-dashboard").fadeOut(200);
    $("#mensaje-dashboard").hide();
  });

  // Crear nuevo dashboard (simulación)
  $("#btn-crear-dashboard").click(function(){
    let nuevo = $("#nuevo-dashboard").val().trim();
    if(nuevo){
      $("#select-dashboard").append(`<option value="${nuevo.toLowerCase()}">${nuevo}</option>`);
      $("#select-dashboard").val(nuevo.toLowerCase());
      $("#nuevo-dashboard").val("");
      showToast(`Se creo el nuevo dashboard`, "success");
    }
  });

  // Agregar gráfica al dashboard
  $("#btn-agregar-dashboard").click(function(){
    let dashboard = $("#select-dashboard option:selected").text();
    //$("#mensaje-dashboard").text("✅ Gráfica agregada al dashboard " + dashboard).fadeIn(200);
    showToast(`Se agrego la grafica al dashboard`, "success"); 
    $("#modal-dashboard").fadeOut(200);
      $("#mensaje-dashboard").hide();   
  });








});
