import certificados from "./certificados.js";

const certificadosPorPagina = 10;
let paginaAtual = 1;

const listaCertificados = document.getElementById("lista-certificados");
const btnAnterior = document.getElementById("anterior");
const btnProximo = document.getElementById("proximo");

// Função para renderizar os certificados
function renderizarCertificados() {
  listaCertificados.innerHTML = "";

  const inicio = (paginaAtual - 1) * certificadosPorPagina;
  const fim = inicio + certificadosPorPagina;
  const certificadosPagina = certificados.slice(inicio, fim);

  certificadosPagina.forEach((arquivo, index) => {
    const divCertificado = document.createElement("div");
    divCertificado.classList.add("certificado");
    divCertificado.setAttribute("data-preview", arquivo);

    const fileType = arquivo.split(".").pop().toLowerCase();

    divCertificado.innerHTML = `
      <img src="faviconV2.png" alt="Certificado ${inicio + index + 1}" />
      <p>Certificado ${inicio + index + 1}</p>
    `;

    divCertificado.addEventListener("click", () => {
      const modalImage = document.getElementById("modal-image");
      const modalPdf = document.getElementById("modal-pdf");
      const modalPreview = document.getElementById("modal-preview");

      if (fileType === "jpg" || fileType === "png") {
        modalPdf.style.display = "none";
        modalImage.style.display = "block";
        modalImage.src = arquivo;
      } else if (fileType === "pdf") {
        modalImage.style.display = "none";
        modalPdf.style.display = "block";
        modalPdf.src = arquivo;
      }

      modalPreview.style.display = "flex";
    });

    listaCertificados.appendChild(divCertificado);
  });

  atualizarBotoes();
}

// Função para atualizar o estado dos botões de paginação
function atualizarBotoes() {
  btnAnterior.disabled = paginaAtual === 1;
  btnProximo.disabled =
    paginaAtual === Math.ceil(certificados.length / certificadosPorPagina);
}

// Eventos para controle da paginação
btnAnterior.addEventListener("click", () => {
  if (paginaAtual > 1) {
    paginaAtual--;
    renderizarCertificados();
  }
});

btnProximo.addEventListener("click", () => {
  if (paginaAtual < certificados.length / certificadosPorPagina) {
    paginaAtual++;
    renderizarCertificados();
  }
});

// Inicializa a exibição
renderizarCertificados();

// Fecha o modal
document.getElementById("close-modal").addEventListener("click", () => {
  const modalPreview = document.getElementById("modal-preview");
  const modalImage = document.getElementById("modal-image");
  const modalPdf = document.getElementById("modal-pdf");

  modalPreview.style.display = "none";
  modalImage.src = "";
  modalPdf.src = "";
});
