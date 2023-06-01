import { Title, DashboardContainer, CardsContainer } from "./DashboardElements";
import Card from "../Card/Card";
import { MdLiveTv, MdOutlineDevices } from "react-icons/md";
import { FaTemperatureHigh, FaRegLightbulb } from "react-icons/fa";

const Dashboard = () => {
  return (
    <>
      <Title>Dashboard</Title>
      <DashboardContainer>
        <CardsContainer>
          <Card
            icon={<MdLiveTv fontSize={25} />}
            id={1}
            isFirstColor={true}
            title={"Live Stream"}
            infoRight={"Front Door"}
            buttonText={"View"}
            type={"livestream"}
            pageSrc={"/livestream"}
          />
          <Card
            icon={<FaTemperatureHigh fontSize={20} />}
            id={2}
            isFirstColor={false}
            title={"Temperature"}
            infoRight={"23 °C"}
            buttonText={"Add Text"}
            type={"temperature"}
            pageSrc={"/"}
          />
          <Card
            icon={<FaRegLightbulb fontSize={25} />}
            id={3}
            isFirstColor={false}
            title={"Lights"}
            infoRight={"8m"}
            buttonText={"Add Text"}
            type={"lights"}
            pageSrc={"/"}
          />
          <Card
            icon={<MdOutlineDevices fontSize={25} />}
            id={4}
            isFirstColor={true}
            title={"Devices"}
            infoRight={"8m"}
            buttonText={"Add Text"}
            type={"devices"}
            pageSrc={"/"}
          />
        </CardsContainer>
      </DashboardContainer>
    </>
  );
};

export default Dashboard;
