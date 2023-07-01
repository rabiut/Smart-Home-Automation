export const fetchData = async () => {
  const res = await fetch("http://192.168.2.16:5000/api/v1/readTemp", {
    next: { revalidate: 60 },
  });
  // console.log("request made");
  return res.json();
};
