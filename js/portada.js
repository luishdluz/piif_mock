$(document).ready(function() {
  
  //Buscador de libros
  $('#buscador-libros').on('input', function() {
    var texto = $(this).val().toLowerCase();
    var encontrados = 0;

    $('.libro').each(function() {
      var titulo = $(this).find('h5').text().toLowerCase();
      if (titulo.includes(texto)) {
        $(this).css('display', 'flex'); // mostrar
        encontrados++;
      } else {
        $(this).css('display', 'none'); // ocultar
      }
    });

    // Mostrar mensaje si no hay resultados
    var contenedorCards = $('.cards-container');
    var mensajeNoResultados = contenedorCards.find('.no-resultados');

    if (encontrados === 0) {
      if (mensajeNoResultados.length === 0) {
        contenedorCards.append('<div class="no-resultados" style="text-align:center; grid-column:1/-1; color:#000000; font-weight:bold; padding:1rem;">No se encontraron libros</div>');
      }
    } else {
      mensajeNoResultados.remove();
    }
  });

  //Modal de información de libros
  $('.icono-info').on('click', function() {
    var libro = $(this).closest('.libro');
    var titulo = libro.data('titulo');
    var descripcion = libro.data('descripcion');
    var imagen = libro.data('imagen');

    $('#modal-libro .modal-titulo').text(titulo);
    $('#modal-libro .modal-descripcion').text(descripcion);
    $('#modal-libro .modal-imagen').attr('src', imagen);

    $('#modal-libro').fadeIn(200);
  });

  // Cerrar modal al hacer clic en la X o botón cerrar
  $('#modal-libro .cerrar, #modal-libro .btn-cerrar').on('click', function() {
    $('#modal-libro').fadeOut(200);
  });

  // Cerrar modal al hacer clic fuera del contenido
  $(window).on('click', function(e) {
    if ($(e.target).is('#modal-libro')) {
      $('#modal-libro').fadeOut(200);
    }
  });

  $('.btn-explorar').on('click', function() {
    var libroParam = $(this).closest('.libro').data('libro');
    window.location.href = 'contenidoPortal.html?libro=' + libroParam;
  });


  $("#filtro-libros").on("change", function() {
    const filtro = $(this).val();

    $(".libro").each(function() {
      const tipo = $(this).data("tipo"); // ejemplo si agregas data-tipo en cada libro
      if (filtro === "todos" || filtro === tipo) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

});
