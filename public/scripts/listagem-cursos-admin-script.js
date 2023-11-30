$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:5000/receberCursosAdmin',
    method: 'GET',
    success: function (data) {
      var listaCursos = $('#lista-cursos');

      listaCursos.empty();

      data.forEach(function (curso) {

        var elemento = $('<div>').addClass('itemCurso').attr('idCursos', curso.idCursos);
        var titulo = $('<h2>').text(curso.nome);
        var duracao = $('<p>').text('Duração: ' + curso.duração);
        var descricao = $('<p>').text('Descrição: ' + curso.descrição);
        var dadosCurso = $('<p>').text('Total alunos cursando: ' + curso.totalEmAndamento + ' || ' + 'Total alunos que finalizaram: ' + curso.totalFinalizados + ' || ' + 'Total alunos que cancelaram: ' + curso.totalCancelados);
        var botaoExcluir = $('<button>').text('Excluir').addClass('botao-excluir');

        elemento.append(titulo, duracao, descricao, dadosCurso, botaoExcluir);

        listaCursos.append(elemento);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

  $(document).on('click', '.botao-excluir', function () {
    var card = $(this).closest('.itemCurso');

    var idCurso = card.attr('idCursos');

    $.ajax({
      url: 'http://localhost:5000/deletarCurso/' + idCurso,
      method: 'DELETE',
      success: function () {
        location.reload();
      },
      error: function (xhr, status, error) {
        console.error(error);
      }
    });
  });
});