function cadastrarUsuario() {

  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var contato = document.getElementById('contato').value;
  var cpf = document.getElementById('cpf').value;
  var endereco = document.getElementById('endereco').value;

  const dados = {
    nome: nome,
    email: email,
    contato: contato,
    cpf: cpf,
    endereco: endereco,
  };

  fetch('http://localhost:5000/criarUsuario', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados),
  })
    .then(response => {
      window.location.href = "http://localhost:5000/";
    })
    .catch(error => {
      console.error(error);
    });

}