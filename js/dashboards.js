$(document).ready(function() {

	//Cambia nombre general
	$('#titulo-libro-texto').text("Mis libros");

	//Abre arbol
	$("#btn-expandir").click();


	document.querySelectorAll(".tab").forEach(tab => {
	  tab.addEventListener("click", function() {
	    // Desactivar todos
	    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
	    document.querySelectorAll(".tab-content").forEach(c => c.style.display = "none");

	    // Activar el seleccionado
	    this.classList.add("active");
	    document.getElementById(this.dataset.tab).style.display = "block";
	  });
	});


	/*Graficas de previsualizacion*/
	function generarGraficaFinanciera(id) {
	  let opciones = {
	    chart: {
	      type: 'line' // Tipo por defecto
	    },
	    title: { text: '' },
	    xAxis: {
	      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
	    },
	    yAxis: {
	      title: { text: 'Valor' }
	    },
	    series: []
	  };

  switch(id) {
    case 'grafica1': // Índice bursátil
      opciones.title.text = 'Índice Bursátil';
      opciones.series = [
        { name: 'IPC', data: [45000, 45200, 44900, 45500, 45800, 46000] },
        { name: 'NASDAQ', data: [12000, 12150, 11900, 12200, 12300, 12450] }
      ];
      break;
    case 'grafica2': // Tipos de interés
      opciones.chart.type = 'area';
      opciones.title.text = 'Tipos de interés (%)';
      opciones.series = [
        { name: 'Tasa Banxico', data: [5.5, 5.75, 5.5, 5.25, 5.0, 5.25] },
        { name: 'Tasa Cetes', data: [6, 6.1, 5.9, 5.8, 5.9, 6] }
      ];
      break;
    case 'grafica3': // Volumen de acciones
      opciones.chart.type = 'column';
      opciones.title.text = 'Volumen Acciones';
      opciones.series = [
        { name: 'Acción A', data: [1200, 1500, 1100, 1800, 1700, 1600] },
        { name: 'Acción B', data: [800, 950, 700, 1200, 1100, 1050] }
      ];
      break;
    case 'grafica4': // Precios de commodities
      opciones.title.text = 'Precios de Commodities';
      opciones.series = [
        { name: 'Oro', data: [1800, 1820, 1815, 1830, 1850, 1845] },
        { name: 'Plata', data: [24, 25, 24.5, 25.2, 26, 25.5] }
      ];
      break;
    case 'grafica5': // Inflación
      opciones.chart.type = 'area';
      opciones.title.text = 'Inflación (%)';
      opciones.series = [
        { name: 'Inflación anual', data: [3.5, 3.8, 4.0, 3.9, 4.2, 4.1] }
      ];
      break;
    case 'grafica6': // Exportaciones e importaciones
      opciones.chart.type = 'column';
      opciones.title.text = 'Exportaciones e Importaciones';
      opciones.series = [
        { name: 'Exportaciones', data: [500, 520, 530, 510, 540, 550] },
        { name: 'Importaciones', data: [480, 500, 495, 510, 520, 530] }
      ];
      break;
    case 'grafica7': // Tipo de cambio
      opciones.title.text = 'Tipo de Cambio MXN/USD';
      opciones.series = [
        { name: 'MXN/USD', data: [20.2, 20.5, 20.1, 20.3, 20.4, 20.6] }
      ];
      break;
    case 'grafica8': // Crédito al consumo
      opciones.chart.type = 'area';
      opciones.title.text = 'Crédito al Consumo (millones)';
      opciones.series = [
        { name: 'Crédito bancario', data: [500, 520, 530, 540, 550, 560] },
        { name: 'Crédito personal', data: [300, 310, 320, 330, 340, 350] }
      ];
      break;
    case 'grafica9': // Indicadores de liquidez
      opciones.chart.type = 'line';
      opciones.title.text = 'Indicadores de Liquidez';
      opciones.series = [
        { name: 'Liquidez corriente', data: [1.2, 1.25, 1.3, 1.28, 1.27, 1.3] },
        { name: 'Prueba ácida', data: [0.9, 0.95, 0.92, 0.96, 0.97, 0.95] }
      ];
      break;
  }

  Highcharts.chart(id, opciones);
}


	  for (let i = 1; i <= 9; i++) {
    generarGraficaFinanciera('grafica' + i);
  }

  // Evento del botón buscar
  $('#btn-buscar-graficas').click(function() {
    const fechaInicial = $('#fecha-inicial').val();
    const fechaFinal = $('#fecha-final').val();

    if(!fechaInicial || !fechaFinal){
      showToast(`Seleccione las fechas a buscar`, "error");
      return;
    }

    //showToast(`Buscando de ${fechaInicial} a ${fechaFinal}`, "info");

    // Aquí podrías actualizar las series con datos filtrados
    for (let i = 1; i <= 9; i++) {
      generarGraficaFinanciera('grafica' + i);
    }
  });


  	function generarGraficaResultado(id) {
	  Highcharts.chart(id, {
	    chart: { type: 'line' },
	    title: { text: 'Estadisticas' },
	    xAxis: { categories: ['Ene','Feb','Mar','Abr','May','Jun'] },
	    yAxis: { title: { text: 'Valor' } },
	    series: [
	      { name: 'USD', data: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100] },
	      { name: 'MXN', data: [Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100, Math.random()*100] }
	    ]
	  });
	}

	$('#btn-buscar').click(function() {
	    const palabra = $('#input-busqueda').val().trim();
	    if(!palabra){
	    	$('#resultados-busqueda').empty();
	    	$('#resultados-busqueda').append("<span>Sin resultados</span>");
	    	return;
	    } 

	    $('#resultados-busqueda').empty();

	    for(let i=1; i<=3; i++){
	      const graficaId = 'resultadoGrafica' + i;

	      const acordeon = $(`
	        <div class="accordion">
	          <div class="accordion-header nombreResultado">Resultado ${i}: ${palabra}</div>
	          <div class="accordion-content">
	            <div id="${graficaId}" style="height: 300px;"></div>
	            <button class="btn-agregar">Agregar al dashboard</button>
	          </div>
	        </div>
	      `);

	      $('#resultados-busqueda').append(acordeon);

	      generarGraficaResultado(graficaId);
	    }

	    // Manejo del colapso/expansión
	    $('.accordion-header').off('click').on('click', function() {
	      $(this).next('.accordion-content').slideToggle();
	    });
	});

	$('#resultados-busqueda').on('click', '.btn-agregar', function() {    
	   const tituloGrafica = $(this).closest('.accordion').find('.accordion-header').text();
	   showToast(`Se agrego la grafica al dashboard`, "success");
	});



/*TAP 3 */





  // Función para crear gráfica financiera
  function crearGraficaFinancial(containerId, titulo) {
  	let opciones = {
	    chart: {
	      type: 'line' 
	    },
	    title: { text: '' },
	    xAxis: {
	      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun']
	    },
	    yAxis: {
	      title: { text: 'Valor' }
	    },
	    series: []
	};
	switch(containerId) {
		case 'grafica-1': 
	      opciones.title.text = 'Índice Bursátil';
	      opciones.series = [
	        { name: 'IPC', data: [45000, 45200, 44900, 45500, 45800, 46000] },
	        { name: 'NASDAQ', data: [12000, 12150, 11900, 12200, 12300, 12450] }
	      ];
      	break;
      	case 'grafica-2': // Tipos de interés
      opciones.chart.type = 'area';
      opciones.title.text = 'Tipos de interés (%)';
      opciones.series = [
        { name: 'Tasa Banxico', data: [5.5, 5.75, 5.5, 5.25, 5.0, 5.25] },
        { name: 'Tasa Cetes', data: [6, 6.1, 5.9, 5.8, 5.9, 6] }
      ];
      break;
    case 'grafica-3': // Volumen de acciones
      opciones.chart.type = 'column';
      opciones.title.text = 'Volumen Acciones';
      opciones.series = [
        { name: 'Acción A', data: [1200, 1500, 1100, 1800, 1700, 1600] },
        { name: 'Acción B', data: [800, 950, 700, 1200, 1100, 1050] }
      ];
      break;
    case 'grafica-4': // Precios de commodities
      opciones.title.text = 'Precios de Commodities';
      opciones.series = [
        { name: 'Oro', data: [1800, 1820, 1815, 1830, 1850, 1845] },
        { name: 'Plata', data: [24, 25, 24.5, 25.2, 26, 25.5] }
      ];
      break;
    case 'grafica-5': // Inflación
      opciones.chart.type = 'area';
      opciones.title.text = 'Inflación (%)';
      opciones.series = [
        { name: 'Inflación anual', data: [3.5, 3.8, 4.0, 3.9, 4.2, 4.1] }
      ];
      break;
    case 'grafica-6': // Exportaciones e importaciones
      opciones.chart.type = 'column';
      opciones.title.text = 'Exportaciones e Importaciones';
      opciones.series = [
        { name: 'Exportaciones', data: [500, 520, 530, 510, 540, 550] },
        { name: 'Importaciones', data: [480, 500, 495, 510, 520, 530] }
      ];
      break;
    case 'grafica-7': // Tipo de cambio
      opciones.title.text = 'Tipo de Cambio MXN/USD';
      opciones.series = [
        { name: 'MXN/USD', data: [20.2, 20.5, 20.1, 20.3, 20.4, 20.6] }
      ];
      break;
    case 'grafica-8': // Crédito al consumo
      opciones.chart.type = 'area';
      opciones.title.text = 'Crédito al Consumo (millones)';
      opciones.series = [
        { name: 'Crédito bancario', data: [500, 520, 530, 540, 550, 560] },
        { name: 'Crédito personal', data: [300, 310, 320, 330, 340, 350] }
      ];
      break;
    case 'grafica-9': // Indicadores de liquidez
      opciones.chart.type = 'line';
      opciones.title.text = 'Indicadores de Liquidez';
      opciones.series = [
        { name: 'Liquidez corriente', data: [1.2, 1.25, 1.3, 1.28, 1.27, 1.3] },
        { name: 'Prueba ácida', data: [0.9, 0.95, 0.92, 0.96, 0.97, 0.95] }
      ];
      break;
	}
	Highcharts.chart(containerId, opciones);
    
  }

  // Crear 9 gráficas
  for(let i=1;i<=9;i++){
    const grafId = "grafica-" + i;
    const contenedor = $(`
      <div class="grafica-edicion" draggable="true">
        <div id="${grafId}"></div>
        <div class="botones-grafica">
          <button class="boton-grafica btn-eliminar">🗑️</button>
        </div>
      </div>
    `);
    $("#grid-edicion").append(contenedor);
    crearGraficaFinancial(grafId, "Gráfica Financiera " + i);
  }

	let graficaAEliminar = null;
  // Eliminar gráfica
  $("#grid-edicion").on("click", ".btn-eliminar", function() {
	  graficaAEliminar = $(this).closest(".grafica-edicion");
	  
	  // Configurar modal
	  $(".modal-titulo").text("");
	  $(".modal-descripcion").text("¿Seguro que deseas eliminar esta gráfica?");
	  $(".modal-imagen").hide();
	  $(".modal-botones").show();

	  $("#modal-libro").fadeIn(200);
	});

  // Cerrar modal
$(".cerrar, #modal-cancelar").click(function() {
  graficaAEliminar = null;
  $("#modal-libro").fadeOut(200);
});

// Confirmar eliminación
$("#modal-confirmar").click(function() {
  if(graficaAEliminar){
    graficaAEliminar.remove();
    graficaAEliminar = null;
  }
  $("#modal-libro").fadeOut(200);
  showToast(`Se elimino la gráfica`, "success");
});

  // Drag & Drop con animación
  let dragSrcEl = null;

  function swapElements(el1, el2) {
    const temp = $('<div>').hide();
    $(el1).before(temp);
    $(el2).before(el1);
    temp.replaceWith(el2);
  }

  $("#grid-edicion").on("dragstart",".grafica-edicion", function(e){
    dragSrcEl = this;
    $(this).addClass("dragging");
    e.originalEvent.dataTransfer.effectAllowed = 'move';
  });

  $("#grid-edicion").on("dragend",".grafica-edicion", function(){
    $(this).removeClass("dragging");
  });

  $("#grid-edicion").on("dragover",".grafica-edicion", function(e){
    e.preventDefault();
    e.originalEvent.dataTransfer.dropEffect = 'move';
  });

  $("#grid-edicion").on("drop",".grafica-edicion", function(e){
    e.stopPropagation();
    if(dragSrcEl !== this){
      swapElements(dragSrcEl, this);
    }
    return false;
  });

  // Plantilla de grid
  $("#select-plantilla").change(function(){
    const valor = $(this).val();
    let columnas = 3;
    if(valor==="3x3") columnas=3;
    if(valor==="4x3") columnas=4;
    if(valor==="4x4") columnas=4;
    $("#grid-edicion").css("grid-template-columns", `repeat(${columnas},1fr)`);
  }).trigger("change");

$("#btn-guardar").click(function() {
    showToast("Dashboard guardado correctamente", "success");
  });











});