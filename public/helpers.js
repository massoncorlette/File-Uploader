
document.addEventListener("DOMContentLoaded", () => {
  function handleModal() {

    const toggleButtons = document.querySelectorAll(".addFileModal");
    const modals = document.querySelectorAll(".homeModal");
    let addFileModal = document.getElementById("fileModal");
    let addFolderModal = document.getElementById("folderModal");
    let trashModal = document.getElementById("deleteModal");

    toggleButtons.forEach(button => {
      button.addEventListener("click", function() {
        modals.forEach(modal => {
          modal.style.display = "none";
        });

        if (this.id === "uploadBtn") {
          addFileModal.style.display = "block";
        } else if (this.id === "createBtn") {
          addFolderModal.style.display = "block";
        } else if (this.id === "deleteBtn") {
          trashModal.style.display = "block";
        }
      });
    });
  }
  handleModal();
  
});