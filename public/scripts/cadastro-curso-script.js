function cadastrarCurso() {

  var nome = document.getElementById('nome').value;
  var duracao = document.getElementById('duracao').value;
  var descricao = document.getElementById('descricao').value;

  const dados = {
    nome: nome,
    duracao: duracao,
    descricao: descricao,
  };

  fetch('http://localhost:5000/criarCurso', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
    .then(response => {
      window.location.href = "http://localhost:5000/homeAdmin";
    })
    .catch(error => {
      console.error(error);
    });

}





