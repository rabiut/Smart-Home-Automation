export default async function getDevices() {
  const response = await fetch("https://api.smartthings.com/v1/devices", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.SMARTTHINGS_PAT_TOKEN}`,
    },
    next: {
      revalidate: 60,
    },
  });

  if (!response.ok) {
    throw new Error("Error fetching devices");
  }

  return await response.json();
}
