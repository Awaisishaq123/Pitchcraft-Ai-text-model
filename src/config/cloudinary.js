export const uploadToCloudinary = async (file) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", "ml_default");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/dm9wxxbwi/image/upload`,
    { method: "POST", body: data }
  );

  const response = await res.json();
  return response.secure_url;
};