const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const db = require('./banco/db');



app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/pages'));

var alunoLogado = {};

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/pages/login.html');
},);

app.get('/cadastroUsuario/', async function (req, res) {

  res.sendFile(__dirname + '/public/pages/cadastro-usuario.html');

},);

app.post('/criarUsuario', async (req, res) => {
  const { nome, email, contato, cpf, endereco } = req.body;



  await db.inserirAluno({ nome: nome, email: email, contato: contato, cpf: cpf, endereco: endereco });

  res.send('Postagem recebida com sucesso!');
});

app.post('/criarCurso', async (req, res) => {
  const { nome, duracao, descricao } = req.body;

  await db.inserirCurso({ nome: nome, duracao: duracao, descricao: descricao });

  res.send('Postagem recebida com sucesso!');
});

app.post('/login', async (req, res) => {
  const { email, cpf, } = req.body;

  var loginResponse = await db.verificaSeAlunoExiste(email, cpf);

  if (loginResponse.length > 0) {
    alunoLogado = loginResponse[0];
  }

  res.send(loginResponse);
});

app.post('/matricularCurso/:idCurso', async (req, res) => {
  const idCurso = req.params.idCurso;

  await db.matricularCurso(idCurso, alunoLogado.idAlunos);

  res.send('Postagem recebida com sucesso!');
});

app.post('/finalizarCurso/:idCurso', async (req, res) => {
  const idCurso = req.params.idCurso;
  await db.finalizarCurso(idCurso, alunoLogado.idAlunos);

  res.send('Postagem recebida com sucesso!');
});

app.post('/cancelarInscricao/:idCurso', async (req, res) => {
  const idCurso = req.params.idCurso;

  await db.cancelarInscricao(idCurso, alunoLogado.idAlunos);

  res.send('Postagem recebida com sucesso!');
});

app.get('/homeAdmin', function (req, res) {
  res.sendFile(__dirname + '/public/pages/home-admin.html');
},);

app.get('/homeAluno', function (req, res) {
  res.sendFile(__dirname + '/public/pages/home-aluno.html');
},);


app.get('/cadastrarCurso', function (req, res) {
  res.sendFile(__dirname + '/public/pages/cadastro-curso.html');
},);

app.get('/listaCursosAdmin', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-cursos-admin.html');
},);

app.get('/listaCursosAluno', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-cursos-aluno.html');
},);

app.get('/listaCursosEmAndamento', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-cursos-em-andamento.html');
},);

app.get('/listaCursosFinalizados', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-cursos-finalizados.html');
},);

app.get('/listaCursosCancelados', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-cursos-cancelados.html');
},);


app.get('/listaAlunosAdmin', function (req, res) {
  res.sendFile(__dirname + '/public/pages/lista-alunos-admin.html');
},);



app.get('/receberCursosAdmin', async function (req, res) {

  response = await db.receberCursosAdmin();

  res.send(response);
},);

app.get('/receberCursosAluno', async function (req, res) {

  response = await db.receberCursosAluno(alunoLogado.idAlunos);

  res.send(response);
},);

app.get('/receberCursosEmAndamento', async function (req, res) {

  response = await db.receberCursosEmAndamento(alunoLogado.idAlunos);

  res.send(response);
},);

app.get('/receberCursosFinalizados', async function (req, res) {

  response = await db.receberCursosFinalizados(alunoLogado.idAlunos);

  res.send(response);
},);

app.get('/receberCursosCancelados', async function (req, res) {

  response = await db.receberCursosCancelados(alunoLogado.idAlunos);

  res.send(response);
},);


app.get('/receberAlunosAdmin', async function (req, res) {

  response = await db.receberAlunosAdmin();

  res.send(response);
},);

app.delete('/deletarCurso/:idCurso', async (req, res) => {
  const idCurso = req.params.idCurso;

  await db.deletarCurso(idCurso);

  res.send('Delete recebida com sucesso!');
});

app.delete('/deletarAluno/:idAluno', async (req, res) => {
  const idAluno = req.params.idAluno;

  await db.deletarAluno(idAluno);

  res.send('Delete recebida com sucesso!');
});

app.listen(5000, function (erro) {
  if (erro) {
  } else {
    console.log('Servidor iniciado com sucesso');
  }
}

);