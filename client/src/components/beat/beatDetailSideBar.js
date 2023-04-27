import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { externalManageDropdown } from "@/components/beat/newBeatCardGrid";
import { addToCart } from "@/redux/slices/cart";
import {
  BeatImage,
  AuthorName,
  BeatPrice,
  BeatBPM,
  BeatTitle,
  BeatAudio,
  AddToCart,
  BeatReviewPopup,
} from "@/components";
import { useState } from "react";

export default function BeatDetailSideBar() {
  const currentBeat = useSelector((state) => state.beats.activeItemDetail);

  const hasReview = currentBeat.review.length > 0 ? true : false;

  const dynamicBeatDetailBox = [
    {
      msg1: "Free License, MP3",
      msg2: "$0.00",
      beat: currentBeat.audioMP3,
      type: "free",
    },
    {
      msg1: "Standart License, WAV",
      msg2: `$${currentBeat.priceAmount}`,
      beat: currentBeat.audioWAV,
      type: "paid",
    },
  ];

  // const dynamicBeatDetailBox = [
  //   {
  //     msg1: "Free License, MP3",
  //     msg2: "$0.00",
  //     beat: currentBeat,
  //   },
  //   {
  //     msg1: "Standart License, WAV",
  //     msg2: "$10.00",
  //     beat: currentBeat,
  //   },
  // ];
  const [showModalReview, setShowModalReview] = useState(false);
  const handleModalReview = () => {
    setShowModalReview(!showModalReview);
  };

  return (
    <>
      <div className="flex flex-col gap-8 px-4  sm:px-9 sm:pt-8">
        <BeatDataBox beat={currentBeat} />
        <div className="flex flex-col gap-3">
          <p className=" color-primary-red-700  text-sm font-medium">
            Precios y licencias
          </p>
          <div className=" flex flex-col gap-4">
            {dynamicBeatDetailBox.map((box) => {
              return (
                <div>
                  <BeatDetailBox
                    msg1={box.msg1}
                    msg2={box.msg2}
                    key={box.msg1}
                    beat={currentBeat}
                    type={box.type}
                  />
                  <hr className="mt-4 border-slate-200" />
                </div>
              );
            })}
          </div>
          <BeatAudio beat={currentBeat} />
          {hasReview && (
            <button
              className="background-primary-red-700 mt-2 color-neutral-white rounded-full px-5 py-3 text-sm font-semibold"
              onClick={handleModalReview}
            >
              Ver reviews
            </button>
          )}
        </div>
      </div>
      <BeatReviewPopup
        modal={showModalReview}
        handleModalReview={handleModalReview}
      />
    </>
  );
}

function BeatDataBox({ beat }) {
  return (
    <div className="gap-estilo3 flex w-[286px] flex-row bg-white">
      <BeatImage beat={beat} height={80} width={80} />
      <div className="flex flex-col justify-center">
        <BeatTitle beat={beat} />
        <AuthorName beat={beat} />
        <div className="pt-0">
          <BeatPrice beat={beat} />
          <BeatBPM beat={beat} />
        </div>
      </div>
    </div>
  );
}

function BeatDetailBox({ msg1, msg2, beat, type }) {
  const dispatch = useDispatch();

  //que el boton pueda descargar el beat
  return (
    <div className="h-auto">
      <p className="pb-1 text-base font-medium text-black">{msg1}</p>
      <p className=" mb-1 text-sm font-semibold text-red-700">{msg2}</p>
      {type === "free" ? (
        <a
          className=" text-sm font-semibold text-red-700"
          download
          href={beat.audioMP3}
        >
          Descargar
        </a>
      ) : (
        <AddToCart beat={beat} posAction={() => externalManageDropdown()} />
      )}
    </div>
  );
}
