
document.addEventListener("DOMContentLoaded", () => {
  function handleModal() {

    const toggleButtons = document.querySelectorAll(".addFileModal");
    const modals = document.querySelectorAll(".homeModal");
    let addFileModal = document.getElementById("fileModal");
    let addFolderModal = document.getElementById("folderModal");
    let trashModal = document.getElementById("deleteModal");
    let downloadModal = document.getElementById("downloadModal");
    let editModal = document.getElementById("editModal");

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
        } else if (this.id === "downloadBtn" || this.id === "downloadBtnFileView") {
          downloadModal.style.display = "block";
        } else if (this.id === "fileDeleteBtn") {
          downloadModal.style.display = "block";
        } else if (this.id === "fileEditBtn") {
          editModal.style.display = "block";
        }
      });
    });
  }

  function styleMessages() {
    let toggleRowsColors = false;

    const fieldsDivs = document.querySelectorAll(".filefoldersContainer");

    fieldsDivs.forEach((message) => {
      if (toggleRowsColors) {
        message.classList.add("light");
        toggleRowsColors = false;
      } else {
        message.classList.add("dark");
        toggleRowsColors = true;
      }
    });
  };
  handleModal();
  styleMessages();
  
});