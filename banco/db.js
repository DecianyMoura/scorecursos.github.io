
async function connect() {

  if (global.connection && global.connection.state !== 'disconnected') {
    return global.connection;
  }

  const mysql = require("mysql2/promise");
  const connection = await mysql.createConnection("mysql://root:@localhost:/scorecursos");

  global.connection = connection;


  return connection;
}

connect();

async function listarAlunos() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT * from alunos');
  return await rows;
}

async function receberCursosAdmin() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT cursos.*, (SELECT COUNT(*) FROM cursofinalizado WHERE cursofinalizado.idCursos = cursos.idCursos) AS totalFinalizados, (SELECT COUNT(*) FROM cursoemandamento WHERE cursoemandamento.idCursos = cursos.idCursos) AS totalEmAndamento, (SELECT COUNT(*) FROM cursocancelado WHERE cursocancelado.idCursos = cursos.idCursos) AS totalCancelados FROM cursos');
  return await rows;
}

async function receberCursosAluno(idAluno) {
  const conn = await connect();
  const sql = 'SELECT * FROM cursos c WHERE NOT EXISTS (  SELECT 1  FROM cursofinalizado cf WHERE cf.idAlunos = ? AND cf.idCursos = c.idCursos) AND NOT EXISTS (  SELECT 1  FROM cursocancelado cc  WHERE  cc.idAlunos = ? AND cc.idCursos = c.idCursos) AND NOT EXISTS (  SELECT 1  FROM cursoemandamento ca  WHERE ca.idAlunos= ? AND ca.idCursos = c.idCursos)';
  const values = [idAluno, idAluno, idAluno];
  const [rows] = await conn.query(sql, values);
  return await rows;
}

async function receberCursosEmAndamento(idAluno) {
  const conn = await connect();
  const sql = 'SELECT c.* FROM cursos c JOIN cursoemandamento ce ON ce.idAlunos = ? AND ce.idCursos = c.idCursos';
  const values = [idAluno];
  const [rows] = await conn.query(sql, values);
  return await rows;
}

async function receberCursosFinalizados(idAluno) {
  const conn = await connect();
  const sql = 'SELECT c.* FROM cursos c JOIN cursofinalizado cf ON cf.idAlunos = ? AND cf.idCursos = c.idCursos';
  const values = [idAluno];
  const [rows] = await conn.query(sql, values);
  return await rows;
}

async function receberCursosCancelados(idAluno) {
  const conn = await connect();
  const sql = 'SELECT c.* FROM cursos c JOIN cursocancelado cc ON cc.idAlunos = ? AND cc.idCursos = c.idCursos';
  const values = [idAluno];
  const [rows] = await conn.query(sql, values);
  return await rows;
}

async function receberAlunosAdmin() {
  const conn = await connect();
  const [rows] = await conn.query('SELECT alunos.*, (SELECT COUNT(*) FROM cursofinalizado WHERE cursofinalizado.idAlunos = alunos.idAlunos) AS totalFinalizados, (SELECT COUNT(*) FROM cursoemandamento WHERE cursoemandamento.idAlunos = alunos.idAlunos) AS totalEmAndamento, (SELECT COUNT(*) FROM cursocancelado WHERE cursocancelado.idAlunos = alunos.idAlunos) AS totalCancelados FROM alunos');
  return await rows;
}

async function verificaSeAlunoExiste(email, senha) {
  const conn = await connect();

  values = [email, senha]
  sql = 'SELECT * from alunos WHERE email = ? AND cpf = ?';

  const [rows] = await conn.query(sql, values);
  return rows;
}

async function inserirAluno(aluno) {
  const conn = await connect();

  const sql = 'INSERT INTO alunos(nome, email, contato, cpf, endereço) VALUES (?, ?, ?, ?, ?)';
  const values = [aluno.nome, aluno.email, aluno.contato, aluno.cpf, aluno.endereco];
  return await conn.query(sql, values);
}

async function inserirCurso(aluno) {
  const conn = await connect();

  const sql = 'INSERT INTO cursos(nome, duração, descrição) VALUES (?, ?, ?)';
  const values = [aluno.nome, aluno.duracao, aluno.descricao];
  return await conn.query(sql, values);
}

async function matricularCurso(idCurso, idAlunos) {
  const conn = await connect();

  const sql = 'INSERT INTO cursoemandamento(idCursos, idAlunos) VALUES (?, ?)';
  const values = [idCurso, idAlunos];
  return await conn.query(sql, values);
}

async function finalizarCurso(idCurso, idAlunos) {
  const conn = await connect();

  const sqlDeletarCursoEmAndamento = 'DELETE FROM cursoemandamento WHERE idCursos = ? AND idAlunos = ?';
  const sqlFinalizarCurso = 'INSERT INTO cursofinalizado(idCursos, idAlunos) VALUES (?, ?)';
  const values = [idCurso, idAlunos];

  await conn.query(sqlDeletarCursoEmAndamento, values)

  return await conn.query(sqlFinalizarCurso, values);
}

async function cancelarInscricao(idCurso, idAlunos) {
  const conn = await connect();

  const sqlDeletarCursoEmAndamento = 'DELETE FROM cursoemandamento WHERE idCursos = ? AND idAlunos = ?';
  const sqlCancelarInscricao = 'INSERT INTO cursocancelado(idCursos, idAlunos) VALUES (?, ?)';
  const values = [idCurso, idAlunos];

  await conn.query(sqlDeletarCursoEmAndamento, values)

  return await conn.query(sqlCancelarInscricao, values);
}

async function deletarCurso(idCurso) {
  const conn = await connect();

  const sqlDeleteCurso = 'DELETE FROM cursos WHERE idCursos=?';
  const sqlDeleteCursoFinalizado = 'DELETE FROM cursofinalizado WHERE idCursos=?';
  const sqlDeleteCursoEmAndamento = 'DELETE FROM cursoemandamento WHERE idCursos=?';
  const sqlDeleteCursoCancelado = 'DELETE FROM cursocancelado WHERE idCursos=?';


  await conn.query(sqlDeleteCursoFinalizado, idCurso);
  await conn.query(sqlDeleteCursoEmAndamento, idCurso);
  await conn.query(sqlDeleteCursoCancelado, idCurso);

  return await conn.query(sqlDeleteCurso, idCurso);
}


async function deletarAluno(idAluno) {
  const conn = await connect();

  const sqlDeleteAluno = 'DELETE FROM alunos WHERE idAlunos=?';
  const sqlDeleteCursoFinalizado = 'DELETE FROM cursofinalizado WHERE idAlunos=?';
  const sqlDeleteCursoEmAndamento = 'DELETE FROM cursoemandamento WHERE idAlunos=?';
  const sqlDeleteCursoCancelado = 'DELETE FROM cursocancelado WHERE idAlunos=?';


  await conn.query(sqlDeleteCursoFinalizado, idAluno);
  await conn.query(sqlDeleteCursoEmAndamento, idAluno);
  await conn.query(sqlDeleteCursoCancelado, idAluno);

  return await conn.query(sqlDeleteAluno, idAluno);
}


module.exports = {
  listarAlunos, inserirAluno, inserirCurso, verificaSeAlunoExiste, receberCursosAdmin, deletarCurso, receberAlunosAdmin, deletarAluno, receberCursosAluno, matricularCurso, finalizarCurso,
  cancelarInscricao, receberCursosEmAndamento, receberCursosFinalizados, receberCursosCancelados,
};
