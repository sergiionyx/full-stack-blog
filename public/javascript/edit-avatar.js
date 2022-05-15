const uploader = document.getElementById("avatar_url");

// event handler for sucessfully uploaded picture
uploader.addEventListener("fileUploadSuccess", async function (e) {
  console.log("value of the picture (link)");
  console.log(this.value);
  const avatarUrl = this.value;
  //   if (this.value) {
  // try{
  const response = await fetch(`/profile/edit`, {
    method: "PUT",
    body: JSON.stringify({ avatarUrl }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.reload();
  } else {
    alert(response.statusText);
  }
  // const data = response.json();
  // console.log(data);
  // }
  // catch (e) {
  //     console.log(e);
  // }
  //     }
  //     else {
  //     console.log("could not find the value");
  //   }
});
