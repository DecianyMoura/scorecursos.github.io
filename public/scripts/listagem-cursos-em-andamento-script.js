$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:5000/receberCursosEmAndamento',
    method: 'GET',
    success: function (data) {
      var listaCursos = $('#lista-cursos');

      listaCursos.empty();

      data.forEach(function (curso) {

        var elemento = $('<div>').addClass('itemCurso').attr('idCursos', curso.idCursos);
        var titulo = $('<h2>').text(curso.nome);
        var duracao = $('<p>').text('Duração: ' + curso.duração);
        var descricao = $('<p>').text('Descrição: ' + curso.descrição);
        var botaoFinalizarCurso = $('<button>').text('Finalizar curso').addClass('botao-finalizar-curso');
        var botaoCancelarInscricao = $('<button>').text('Cancelar inscrição').addClass('botao-cancelar-inscricao');

        elemento.append(titulo, duracao, descricao, botaoFinalizarCurso, botaoCancelarInscricao,);

        listaCursos.append(elemento);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

  $(document).on('click', '.botao-finalizar-curso', function () {
    var card = $(this).closest('.itemCurso');

    var idCurso = card.attr('idCursos');

    $.ajax({
      url: 'http://localhost:5000/finalizarCurso/' + idCurso,
      method: 'POST',
      success: function () {
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });

  $(document).on('click', '.botao-cancelar-inscricao', function () {
    var card = $(this).closest('.itemCurso');

    var idCurso = card.attr('idCursos');

    $.ajax({
      url: 'http://localhost:5000/cancelarInscricao/' + idCurso,
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