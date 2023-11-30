
function login() {

  var loginemail = document.getElementById('log-email').value;
  var loginpass = document.getElementById('log-pass').value;


  const dados = {
    email: loginemail,
    cpf: loginpass,
  };

  if (loginemail == "admin@admin.com" && loginpass == "admin") {

    window.location.href = "http://localhost:5000/homeAdmin";
  }
  else {
    fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados),
    })
      .then(response => response.json()) // Converte a resposta para JSON
      .then(data => {
        if (data.length > 0) {
          window.location.href = "http://localhost:5000/homeAluno";
        } else {
          alert('E-email ou senha incorreto(s)!')
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
}