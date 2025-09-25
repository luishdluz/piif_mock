function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");

    // estilos según tipo
    const colors = {
      success: "successToast",
      error: "errorToast",
      warning: "warningToast",
      info: "infoToast"
    };

    // crear toast
    const toast = document.createElement("div");
    toast.className = `toast-showView px-4 py-2 rounded-lg shadow-lg animate-fade-in-down ${colors[type]}`;
    toast.innerText = message;

    // agregar al contenedor
    container.appendChild(toast);

    // desaparecer después de 3s
    setTimeout(() => {
      toast.classList.add("animate-fade-out");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
}