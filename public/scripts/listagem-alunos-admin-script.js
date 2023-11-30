$(document).ready(function () {
  $.ajax({
    url: 'http://localhost:5000/receberAlunosAdmin',
    method: 'GET',
    success: function (data) {
      var listaAlunos = $('#lista-alunos');

      listaAlunos.empty();

      data.forEach(function (aluno) {

        var elemento = $('<div>').addClass('itemAluno').attr('idAlunos', aluno.idAlunos);
        var titulo = $('<h2>').text(aluno.nome);
        var email = $('<p>').text('E-mail: ' + aluno.email);
        var contato = $('<p>').text('Contato: ' + aluno.contato);
        var cpf = $('<p>').text('CPF: ' + aluno.cpf);
        var endereco = $('<p>').text('Endereço: ' + aluno.endereço);
        var dadosCurso = $('<p>').text('Cursando no momento: ' + aluno.totalEmAndamento + ' || ' + 'Cursos finalizados: ' + aluno.totalFinalizados + ' || ' + 'Cursos cancelados: ' + aluno.totalCancelados);
        var botaoExcluir = $('<button>').text('Excluir').addClass('botao-excluir');

        elemento.append(titulo, email, contato, cpf, endereco, dadosCurso, botaoExcluir);

        listaAlunos.append(elemento);
      });
    },
    error: function (xhr, status, error) {
      console.error(error);
    }
  });

  $(document).on('click', '.botao-excluir', function () {
    var card = $(this).closest('.itemAluno');

    var idAluno = card.attr('idAlunos');

    $.ajax({
      url: 'http://localhost:5000/deletarAluno/' + idAluno,
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