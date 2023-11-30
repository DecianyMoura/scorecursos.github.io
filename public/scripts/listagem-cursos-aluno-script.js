$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:5000/receberCursosAluno',
    method: 'GET',
    success: function (data) {
      var listaCursos = $('#lista-cursos');

      listaCursos.empty();

      data.forEach(function (curso) {

        var elemento = $('<div>').addClass('itemCurso').attr('idCursos', curso.idCursos);
        var titulo = $('<h2>').text(curso.nome);
        var duracao = $('<p>').text('Duração: ' + curso.duração);
        var descricao = $('<p>').text('Descrição: ' + curso.descrição);
        var botaoMatricular = $('<button>').text('Matricular').addClass('botao-matricular');

        elemento.append(titulo, duracao, descricao, botaoMatricular);

        listaCursos.append(elemento);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

  $(document).on('click', '.botao-matricular', function () {
    var card = $(this).closest('.itemCurso');

    var idCurso = card.attr('idCursos');

    $.ajax({
      url: 'http://localhost:5000/matricularCurso/' + idCurso,
      method: 'POST',
      success: function () {
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });
});