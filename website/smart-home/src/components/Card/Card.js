import Link from "next/link";
import LiveStreamPreview from "../LiveStream/Preview/LiveStreamPreview";
import TemperaturePreview from "../Temperature/Preview/TemperaturePreview";
import {
  CardWrap,
  Card,
  TopContainer,
  CardContent,
  IconWrap,
  CardTitle,
  CardInfoRight,
  ButtonWrap,
} from "./CardElements";

import { ButtonLink } from "@/components/Buttons/ButtonElements";
const CardComp = ({
  id,
  isFirstColor,
  icon,
  title,
  infoRight,
  buttonText,
  type,
  pageSrc,
}) => {
  let CardInnerComponent;

  switch (type) {
    case "livestream":
      CardInnerComponent = <LiveStreamPreview />;
      break;
    case "temperature":
      CardInnerComponent = <TemperaturePreview />;
      break;
    default:
      CardInnerComponent = null;
  }
  return (
    <>
      <CardWrap id={id}>
        <Card isFirstColor={isFirstColor}>
          <CardContent>
            <TopContainer>
              <CardTitle>
                <IconWrap>{icon}</IconWrap>
                {title}
              </CardTitle>
              <CardInfoRight>{infoRight}</CardInfoRight>
            </TopContainer>
            {CardInnerComponent}
            <ButtonWrap>
              <ButtonLink href={pageSrc}>{buttonText}</ButtonLink>
            </ButtonWrap>
          </CardContent>
        </Card>
      </CardWrap>
    </>
  );
};

export default CardComp;
