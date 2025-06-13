
document.addEventListener("DOMContentLoaded", () => {
  function handleModal() {

    const toggleModal = document.getElementById("addFileModal");
    let addFileModal = document.getElementById("fileModal");

    toggleModal.addEventListener("click", () => {
      if (addFileModal.style.display == "none") {
        addFileModal.style.display = "block";
      } else {
        addFileModal.style.display = "none";
      }
    });
  };
  handleModal();
  
});