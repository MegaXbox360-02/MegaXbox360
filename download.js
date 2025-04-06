// Obtém o parâmetro "publicacao" da URL
const params = new URLSearchParams(window.location.search);
const publicacao = params.get("publicacao");

// Carrega o arquivo JSON correspondente à publicação
fetch(`publicacao-${publicacao}.json`)
  .then((response) => response.json())
  .then((dados) => {
    // Substitui os placeholders pelos dados da publicação
    fetch("download-template.html")
      .then((response) => response.text())
      .then((template) => {
        let html = template;
        for (const chave in dados) {
          html = html.replace(`{{${chave}}}`, dados[chave]);
        }
        document.body.innerHTML = html;
      });
  });
