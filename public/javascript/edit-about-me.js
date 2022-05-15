async function editMeFormHandler(event) {
  event.preventDefault();

  const aboutMe = document.querySelector('input[name="about-me"]').value.trim();
  const response = await fetch(`/profile/edit`, {
    method: "POST",
    body: JSON.stringify({
      aboutMe,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
}

document
  .querySelector(".edit-profile-about")
  .addEventListener("submit", editMeFormHandler);
