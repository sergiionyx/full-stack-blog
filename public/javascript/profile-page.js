async function editBtnHandler() {

    document.location.replace("/profile/edit");
}

document
  .querySelector("#edit-profile-btn")
  .addEventListener("click", editBtnHandler);
