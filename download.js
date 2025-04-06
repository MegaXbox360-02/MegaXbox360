// Dados da publicação
var dados = {
    titulo: "Título da Publicação",
    imagem: "https://images2.imgbox.com/75/41/FJdl4zyW_o.jpg",
    descricao: "Descrição detalhada da publicação.",
    link1: "URL_DO_DOWNLOAD_1",
    link1_texto: "DISCO 1",
    link2: "URL_DO_DOWNLOAD_2",
    link2_texto: "DISCO 2",
    link3: "URL_DO_DOWNLOAD_3",
    link3_texto: "DISCO 3",
    link4: "URL_DO_DOWNLOAD_4",
    link4_texto: "DISCO 4",
    tamanho_arquivo: "100MB",
    versao: "1.0",
    requisitos: "Xbox 360"
};

// Carrega o template HTML
fetch("download-template.html")
    .then(response => response.text())
    .then(data => {
        // Substitui os placeholders pelos dados da publicação
        var html = data;
        for (var chave in dados) {
            html = html.replace("{{" + chave + "}}", dados[chave]);
        }

        // Insere o HTML na página
        document.body.innerHTML = html;
    });
