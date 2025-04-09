// Obtém os parâmetros "categoria" e "jogo" da URL
const params = new URLSearchParams(window.location.search);
const categoria = params.get("categoria");
const jogo = params.get("jogo");

// Carrega o arquivo de configuração
fetch("config.json")
  .then((response) => response.json())
  .then((config) => {
    // Verifica se a categoria e o jogo existem no arquivo de configuração
    if (config.categorias[categoria] && config.categorias[categoria].includes(jogo)) {
      // Constrói o caminho do arquivo JSON
      const caminhoArquivo = `dados/${categoria}/${jogo}.json`;

      // Carrega o arquivo JSON da publicação
      fetch(caminhoArquivo)
        .then((response) => response.json())
        .then((dados) => {
          // Gera os botões de download com links Base64
          let botoesHtml = "";
          if (dados.downloads && Array.isArray(dados.downloads)) {
            dados.downloads.forEach((download) => {
              const urlDecodificada = atob(download.url);
              botoesHtml += `<a href="${urlDecodificada}" class="botao" target="_blank">${download.texto}</a>`;
            });
          }
          dados.botoes = botoesHtml;

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
    } else {
      // Categoria ou jogo inválido
      console.error("Categoria ou jogo inválido.");
    }
  });
