async function editAboutMeFormHandler(event) {
  event.preventDefault();

//   const aboutMe = document.querySelector('input[name="about-me"]').value.trim();
//   const response = await fetch(`/profile/edit`, {
//     method: "POST",
//     body: JSON.stringify({
//       aboutMe,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (response.ok) {
//     document.location.reload();
//   } else {
//     alert(response.statusText);
//   }


  const aboutMe = document.querySelector('input[name="about-me"]').value.trim();
  if (aboutMe) {
    try {
      const response = await fetch(`/profile/edit`, {
        method: "POST",
        body: JSON.stringify({ aboutMe }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Could not load About Me text");
  }
  document.location.reload();
}

document
  .querySelector(".edit-profile-about")
  .addEventListener("submit", editAboutMeFormHandler);
