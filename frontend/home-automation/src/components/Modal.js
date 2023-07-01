import React, { useRef, useEffect, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { MdClose } from "react-icons/md";

const Modal = ({ showModal, closeModal, title, children }) => {
  const modalRef = useRef();

  const animation = useSpring({
    config: {
      duration: 250,
    },
    opacity: showModal ? 1 : 0,
    transform: showModal ? `translateY(0%)` : `translateY(-100%)`,
  });

  const closeOnOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      closeModal(); // Use closeModal from props
    }
  };

  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && showModal) {
        closeModal(); // Use closeModal from props
      }
    },
    [closeModal, showModal] // Update dependency to closeModal from props
  );

  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);

  return (
    <>
      {showModal ? (
        <div
          onClick={closeOnOverlayClick}
          ref={modalRef}
          className="background fixed top-0 left-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-25 z-10"
        >
          <animated.div
            style={animation}
            className="w-[90%] h-fit md:w-min md:h-min"
          >
            <div className="modal__wrapper relative bg-white rounded-lg shadow-md w-full h-full md:w-[760px] md:h-[500px] z-10 overflow-hidden">
              <div className="top__bar w-full h-14 bg-primary-500  p-4">
                <div className="title text-white font-bold text-xl">
                  {title}
                </div>
              </div>
              <div className="modal__content flex flex-col justify-start items-center w-full h-full md:text-lg leading-relaxed p-4 md:p-8">
                {children}
              </div>
              <div
                aria-label="Close modal"
                onClick={closeModal} // Use closeModal from props
                className="absolute cursor-pointer top-3 right-3 z-10 text-3xl text-white"
              >
                <MdClose />
              </div>
            </div>
          </animated.div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
