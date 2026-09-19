import { useState } from "react";

interface CardMediaCarouselProps {
  images: string[];
}

export function Carousel({
  images,
}: CardMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const previous = () => {
    setActiveIndex((current) =>
      current === 0 ? images.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === images.length - 1 ? 0 : current + 1
    );
  };

  if (!images.length) {
    return null;
  }

  return (
    <div className="card-carousel">
      <div className="card-carousel__viewport">
        <div
          className="card-carousel__track"
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
          }}
        >
          {images.map((image, index) => (
            <div
              className="card-carousel__slide"
              key={`${image}-${index}`}
            >
              <img
                src={image}
                alt=""
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            className="card-carousel__button card-carousel__button--prev"
            onClick={(event) => {
              event.stopPropagation();
              previous();
            }}
            aria-label="Previous image"
          >
            ←
          </button>

          <button
            type="button"
            className="card-carousel__button card-carousel__button--next"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            aria-label="Next image"
          >
            →
          </button>

          <div className="card-carousel__dots">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                className={
                  index === activeIndex
                    ? "card-carousel__dot card-carousel__dot--active"
                    : "card-carousel__dot"
                }
                onClick={(event) => {
                  event.stopPropagation();
                  setActiveIndex(index);
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}