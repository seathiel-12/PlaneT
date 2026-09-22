import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";

import "./ExpandableCard.css";
import { Carousel } from '../Carousel';
import { useMediaQuery } from "@mantine/hooks";
import { ScrollArea } from "@mantine/core";
import Image from "../../Image/Image";

gsap.registerPlugin(Flip);

interface ExpandableCardProps {
  title: string;
  category?: string;
  images?: string[];
  previewElement?: ReactNode;
  children: ReactNode;
}

export function ExpandableCard({
  title,
  category,
  images,
  previewElement,
  children,
}: ExpandableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const [expanded, setExpanded] = useState(false);
  const isAnimating = useRef(false);

  const open = useCallback(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;

    if (!card || !overlay || isAnimating.current) return;

    isAnimating.current = true;

    const parent = card.parentElement;
    const siblings = parent ? Array.from(parent.children).filter((child) => child !== card) : [];
    const state = Flip.getState([card, ...siblings]);

    setExpanded(true);

    requestAnimationFrame(() => {
      gsap.to(overlay, {
        autoAlpha: 1,
        duration: 0.45,
        ease: "power2.out",
      });

      Flip.from(state, {
        duration: 0.75,
        ease: "power3.inOut",
        nested: true,
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    });
  }, []);

  const close = useCallback(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;

    if (!card || !overlay || isAnimating.current) return;

    isAnimating.current = true;

    const parent = card.parentElement;
    const siblings = parent ? Array.from(parent.children).filter((child) => child !== card) : [];
    const state = Flip.getState([card, ...siblings]);

    setExpanded(false);

    requestAnimationFrame(() => {
       gsap.from(overlay, {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power3.inOut",
        visibility:'hidden',
        opacity:0,
        fill:'forwards'
      });
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.35,
        ease: "power3.inOut",
        visibility:'visible',
        opacity:1,
        fill:'forwards'
      });

      Flip.from(state, {
        duration: 0.7,
        ease: "power3.inOut",
        nested: true,
        onComplete: () => {
          isAnimating.current = false;
        },
      });
    });
  }, []);

  const isMobile = useMediaQuery('(max-width: 910px)');

  useEffect(() => {
    if (!expanded) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [expanded, close]);

  const child =  
    <div className="min-w-full">
      <button
        className="expandable-card__close"
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
        aria-label="Close"
      >
         ×
      </button>
      {category && (
        <span className="expandable-card__category">
          {category}
        </span>
      )}
        <h2>{title}</h2>

        <div className="expandable-card__body">
          {children}
        </div>                
    </div>


  return (
    <>
      <article
        ref={cardRef}
        className={`expandable-card ${
          expanded ? "expandable-card--expanded" : ""
        }`}
        onClick={!expanded ? open : undefined}
      >
        {!expanded ? (
          previewElement ? (
            <div className="expandable-card__preview">
              {previewElement}
            </div>
          ) : (
            <div className="expandable-card__preview">
              <div className="expandable-card__preview-image">
                <Image src={images?.[0] || ""} alt="" className="rounded-t-xl" />
              </div>

              <div className="expandable-card__preview-content">
                {category && (
                  <span className="expandable-card__category">
                    {category}
                  </span>
                )}

                <h2>{title}</h2>
              </div>
            </div>
          )
        ) : (
          <div className="expandable-card__expanded-content">
            {images && images.length > 0 ? (
              <div className="expandable-card__media transition-all duration-200">
                <Carousel images={images} />
              </div>
            ) : null}

            <div className="expandable-card__details">
              {
                isMobile ? <ScrollArea h={'100%'} children={child} /> : child
              }
            </div>
          </div>
        )}
      </article>

      <div
        ref={overlayRef}
        className="expandable-card__overlay"
        aria-hidden={!expanded}
        onClick={close}
        style={expanded ? {visibility: 'visible', opacity:1} : undefined}
      />
    </>
  );
}