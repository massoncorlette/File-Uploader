
document.addEventListener("DOMContentLoaded", () => {
  function handleModal() {

    const toggleButtons = document.querySelectorAll(".addFileModal");
    let addFileModal = document.getElementById("fileModal");

    toggleButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (addFileModal.style.display === "none" || addFileModal.style.display === "") {
          addFileModal.style.display = "block";
        } else {
          addFileModal.style.display = "none";
        }
      });
    });
  }
  handleModal();
  
});