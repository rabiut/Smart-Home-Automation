import dynamic from "next/dynamic";

const LiveStream = dynamic(() => import("@/components/LiveStream/LiveStream"), {
  ssr: false,
});

const LiveStreamPage = () => {
  return (
    <>
      <div className="flex h-screen w-full">
        <LiveStream />
      </div>
    </>
  );
};

export default LiveStreamPage;
