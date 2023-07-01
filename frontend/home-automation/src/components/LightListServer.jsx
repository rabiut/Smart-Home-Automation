import axios from "axios";

async function getData() {
  const res = await fetch(
    "http://192.168.2.43:5000/api/v1/getLightStatus?room=taiwo_bedroom"
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const LightListServer = async () => {
  // const { data } = await axios.get(
  //   "http://192.168.2.43:5000/api/v1/getLightStatus"
  // );
  // console.log("data", data);

  const data = await getData();
  console.log("data", data);
  return (
    <>
      <div className="flex flex-col w-full h-fit bg-primary-500">
        {JSON.stringify(data)}
      </div>
    </>
  );
};
export default LightListServer;
