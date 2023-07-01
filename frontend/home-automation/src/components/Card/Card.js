import LiveStreamPreview from "../LiveStream/Preview/LiveStreamPreview";
import TemperaturePreview from "../Temperature/Preview/TemperaturePreview";
import LightsPreview from "../Lights/Preview";
import Link from "next/link";

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
    case "lights":
      CardInnerComponent = <LightsPreview />;
      break;
    default:
      CardInnerComponent = null;
  }

  const cardBg = isFirstColor ? "bg-card_color-500" : "bg-card_color-500";
  return (
    <>
      {/* <CardWrap id={id}>
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
      </CardWrap> */}

      <div className="card__wrap w-custom-card h-custom-card p-4 cursor-pointer">
        <div
          className={`card ${cardBg} shadow-lg w-full h-full p-4 rounded-3xl`}
        >
          <div className="card__content relative flex w-full h-full">
            <div className="top__container absolute top-0 w-full flex justify-between">
              <div className="card__title flex cursor-pointer text-xl font-bold">
                <div className="icon cursor-pointer mr-4">{icon}</div>
                {title}
              </div>
              <div className="info__right text-lg font-normal cursor-pointer">
                {infoRight}
              </div>
            </div>
            {CardInnerComponent}
            <Link href={pageSrc} className="btn_link ">
              <div className="btn__wrap absolute bottom-0 w-full flex justify-center items-center">
                <div className="btn rounded-md bg-secondary-500 whitespace-nowrap py-2.5 px-5 text-slate-50 no-underline cursor-pointer text-base font-semibold flex justify-center items-center transition-all ease-in-out w-full hover:bg-secondary-400">
                  {buttonText}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardComp;
