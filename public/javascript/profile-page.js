async function editBtnHandler() {
    
  const response = await fetch(`/profile/edit`, {
    method: 'GET'
  });

  if (response.ok) {
    document.location.replace('/profile/edit');
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector("#edit-profile-btn")
  .addEventListener("click", editBtnHandler);

