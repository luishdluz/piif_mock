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
    $('#menu-lateral').toggleClass('show');
  });

  // Cerrar menú al hacer clic fuera
  $(document).on('click', function(e) {
    if (!$(e.target).closest('#menu-lateral, #btn-hamburguesa').length) {
      $('#menu-lateral').removeClass('show');
    }
  });

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

    // Aquí podrías traer contenido dinámico o simular con texto
    //$("#contenido-libro").html(
      //`<h2>${$(this).text()}</h2><p>Contenido cargado para <strong>${contenidoId}</strong>.</p>`
    //);

    $(".seccionSelect").text($(this).text());

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


});
