$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:5000/receberCursosFinalizados',
    method: 'GET',
    success: function (data) {
      var listaCursos = $('#lista-cursos');

      listaCursos.empty();

      data.forEach(function (curso) {

        var elemento = $('<div>').addClass('itemCurso').attr('idCursos', curso.idCursos);
        var titulo = $('<h2>').text(curso.nome);
        var duracao = $('<p>').text('Duração: ' + curso.duração);
        var descricao = $('<p>').text('Descrição: ' + curso.descrição);


        elemento.append(titulo, duracao, descricao);

        listaCursos.append(elemento);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });



});