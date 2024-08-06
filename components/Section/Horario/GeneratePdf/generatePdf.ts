export const generatePdf = async (element: HTMLElement | null | undefined) => {
  if (element) {
    const mod = await import("html2pdf.js");
    const html2pdf = mod.default;

    const opt = {
      margin: [5, 5],

      filename: "boseta.pdf",

      image: {
        type: "jpeg",
        quality: 0.98,
      },
      html2canvas: {
        scale: 1,
        imageTimeout: 0,
      },
      jsPDF: {
        format: "a3",
        orientation: "landscape",
      },
    };

    html2pdf().set(opt).from(element).save();
  }
};
