const uploader = document.getElementById("avatar_url");

// event handler for sucessfully uploaded picture
uploader.addEventListener("fileUploadSuccess", async function (e) {
  const avatarUrl = this.value;
  if (avatarUrl) {
    try {
      const response = await fetch(`/profile/edit`, {
        method: "PUT",
        body: JSON.stringify({ avatarUrl }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Could not load the picture");
  }
  document.location.reload();
});
