import getDevices from "@/lib/getDevices";
export default async function Page() {
  const devices = await getDevices();
  const { items } = devices;

  console.log(devices);

  return (
    <>
      <div className="text-center mt-20">
        <h1 className="text-5xl font-bold">Devices</h1>
        {items.map((items) => (
          <div key={items.id}>
            <h2 className="text-2xl font-bold">name: {items.name}</h2>
            <p className="text-xl">label: {items.label}</p>
            <p className="text-xl">
              manufacturerName: {items.manufacturerName}
            </p>
            <p className="text-xl">locationId: {items.locationId}</p>
            <p className="text-xl">ownerId: {items.ownerId}</p>
            <p className="text-xl">roomId:{items.roomId}</p>
          </div>
        ))}
      </div>
    </>
  );
}
