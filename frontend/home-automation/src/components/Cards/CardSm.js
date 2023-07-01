const CardSm = ({ title, icon, description, className, onClick }) => {
  return (
    <>
      <div className={`${className}`} onClick={onClick}>
        <div className="title font-bold">{title}</div>
        <div className="logo__container text-4xl">{icon}</div>
        <p>{description}</p>
      </div>
    </>
  );
};

export default CardSm;
