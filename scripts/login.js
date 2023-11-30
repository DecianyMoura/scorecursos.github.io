function log() {
    var loginemail = document.getElementById('log-email').value;
    var loginpass = document.getElementById('log-pass').value;

    if (loginemail == "eduardo.fgm.neto@gmail.com" && loginpass == "link360") {
        alert('sucesso');
        location.href = "index.html";
    }

    else {
        alert('usuario ou senha errados')
    }
}