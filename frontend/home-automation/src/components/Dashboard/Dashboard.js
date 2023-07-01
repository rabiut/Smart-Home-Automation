import { FaBed } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { BsFillCameraVideoFill, BsLightbulbFill } from "react-icons/bs";
import CardSm from "../Cards/CardSm";
import TemperatureWidget from "@/components/TemperatureWidget";
import Link from "next/link";
import { useState } from "react";
import Modal from "@/components/Modal";
import LightList from "@/components/LightList";
import CurrentDate from "@/lib/utils/CurrentDate";
import CurrentLocation from "@/lib/utils/CurrentLocation";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(null);

  const openModal = (content) => {
    setModalData(content);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalData(null);
    setShowModal(false);
  };
  const cardsData = [
    {
      link: true,
      className:
        "card__1 bg-white w-full md:w-1/4 min-h-[200px] rounded-lg p-4 shadow-md cursor-pointer border border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105",
      title: "LiveStream",
      icon: <BsFillCameraVideoFill className=" text-4xl" />,
      description:
        "View real-time video footage of your home. Monitor your property at any time.",
    },
    {
      link: false,
      className:
        "card__2 bg-white w-full md:w-1/4 min-h-[200px] rounded-lg p-4 shadow-md cursor-pointer border border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105",
      title: "Lights",
      icon: <BsLightbulbFill className=" text-4xl" />,
      description:
        "Control your home lights. Tailor lighting conditions according to your preference.",
      modalData: { title: "Your Lights", component: <LightList /> },
    },
    {
      link: false,
      className:
        "card__3 bg-white w-full md:w-1/4 min-h-[200px] rounded-lg p-4 shadow-md cursor-pointer border border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105",
      title: "Kitchen",
      icon: <MdKitchen className=" text-4xl" />,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      modalData: { title: "NULL", component: null },
    },
    {
      link: false,
      className:
        "card__4 bg-white w-full md:w-1/4 min-h-[200px] rounded-lg p-4 shadow-md cursor-pointer border border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105",
      title: "Bedroom",
      icon: <FaBed className=" text-4xl" />,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
      modalData: { title: "NULL", component: null },
    },
  ];

  return (
    <>
      <div className="dashboard__layer flex flex-col md:flex-row md:h-[840px] w-full p-8 md:p-14 gap-8 text-base lg:text-lg bg-background-500">
        {/* Dashboard Col */}
        <div className="dashboard__col flex flex-col w-full md:w-96 gap-5">
          {/* Home Widget */}
          <div className="home__widget flex flex-col h-full text-base lg:text-lg xl:text-xl bg-white shadow-md border border-gray-200 rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
            <div className="bar w-full h-1/5 bg-primary-500 p-4 text-white font-bold rounded-t-lg">
              Your Home
            </div>
            <div className="content w-full h-4/5 p-6 sm:p-4 flex flex-col justify-between">
              <span>
                Condition:
                <span className="condition text-green-500 ml-4">Good</span>
              </span>
              <span>
                <CurrentDate />
              </span>
              <span>
                <CurrentLocation />
              </span>
              <div className="stats flex gap-4 ">
                <div className="flex flex-col font-semibold">
                  TEMP{" "}
                  <span className="text-xl md:text-xl font-normal">23° C</span>
                </div>
                <div className="flex flex-col font-semibold">
                  Humidity{" "}
                  <span className="text-xl md:text-xl font-normal">66%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Temperature Widget */}
          <div className="temperature_widget flex flex-col h-full p-6 sm:p-4 bg-white rounded-lg shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 relative z-10">
            <TemperatureWidget />
          </div>

          {/* Wifi Widget*/}
          <div className="wifi_widget flex flex-col h-1/2 bg-white rounded-lg shadow-md p-6 sm:p-4 border border-gray-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <div className="title font-bold ">Wifi</div>
            <div className="">Network: MY_NETWORK_NAME </div>
          </div>
        </div>
        {/* Dashboard Main */}
        <div className="w-full h-full pt-8 flex flex-col gap-4">
          <div className="w-full flex flex-col md:flex-row gap-4">
            {cardsData.map((card, index) =>
              card.link ? (
                <Link
                  href="/livestream"
                  key={index}
                  className={card.className}
                  draggable="false"
                >
                  <CardSm
                    title={card.title}
                    icon={card.icon}
                    description={card.description}
                  />
                </Link>
              ) : (
                <CardSm
                  key={index}
                  className={card.className}
                  title={card.title}
                  icon={card.icon}
                  description={card.description}
                  onClick={() => openModal(card.modalData)}
                />
              )
            )}

            {modalData && (
              <Modal
                showModal={showModal}
                closeModal={closeModal}
                title={modalData.title}
              >
                {modalData.component}
              </Modal>
            )}
          </div>
          <div className="room__accessories w-full bg-primary-500 rounded-lg p-4 flex flex-col border border-gray-200">
            <div className="title text-white font-bold mb-2">
              Room accessories
            </div>
            <div className="accessories__card_container flex w-full md:w-full gap-4">
              <div className="bg-primary-600 w-full md:w-1/6 h-24 rounded-lg flex justify-center items-center">
                <div className="font-bold text-white">FAN</div>
              </div>
              <div className="bg-primary-600 w-full md:w-1/6 h-24 rounded-lg flex justify-center items-center">
                <div className="font-bold text-white">TV</div>
              </div>
              <div className="bg-primary-600 w-full md:w-1/6 h-24 rounded-lg flex justify-center items-center">
                <div className="font-bold text-white">LIGHT</div>
              </div>
            </div>
          </div>
          <div className="log w-full h-48 md:h-full bg-white rounded-lg shadow-md p-4 border border-gray-200">
            {" "}
            <div className="font-bold">Recent Activity</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
