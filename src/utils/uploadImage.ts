export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    console.error("ImgBB Upload Failed:", data);
    throw new Error(data?.error?.message || "Failed to upload image");
  }

  return data.data.url;
};
