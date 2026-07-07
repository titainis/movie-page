import { useEffect, useState } from "react";
import { motion, useMotionValue, animate } from "framer-motion";
import useMeasure from "react-use-measure";
import { Link } from "react-router-dom";
import './MediaSlider.scss';
import { Media } from "../../types/Media";
import { MediaProps } from "../../types/MediaProps";
import { tmdb } from "../../Utils/tmdb";


const MediaSlider = ({ mediaType }: MediaProps) => {
  const STOP_DURATION = 10000000;
  const START_DURATION = 60;

  const [mediaItems, setMediaItems] = useState<Media[]>([]);
  const [duration, setDuration] = useState(START_DURATION);
  const [finish, setFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);
    
  const fetchMedia = async () => {
    const data = await tmdb(`trending/${mediaType}/day`);
    setMediaItems(data.results || []);
  };

  useEffect(() => {
    fetchMedia();
  }, [mediaType]);

  useEffect(() => {
    let controls;
    let finalPos = -width / 2 - 8;

    if(finish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPos], {
        ease: 'linear',
        duration: duration * (1 - xTranslation.get() / finalPos),
        onComplete: () => {
          setFinish(false);
          setRerender(!rerender);
        },
      })
    } else {
       controls = animate(xTranslation, [0, finalPos], {
        ease: 'linear',
        duration: duration,
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [xTranslation, width, duration, rerender]);

  return (
    <div className="media-slider-container d-flex position-relative align-items-center">
      <motion.div 
        className="media-slider d-flex gap-3" 
        ref={ref} 
        style={{ x: xTranslation, width: "max-content" }}
        onHoverStart={() => {
          setFinish(true);
          setDuration(STOP_DURATION);
        }}
        onHoverEnd={() => {
          setFinish(true);
          setDuration(START_DURATION);
        }}
      >
        {[...mediaItems, ...mediaItems].map((item, index) => 
          <Link 
            to={`/${mediaType === 'movie' ? 'movies' : 'tv-series'}/${item.id}`} 
            className='media-slider__card d-flex flex-column align-items-center text-center'
            key={`${item.id}-${index}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
              alt={item.title || item.name}  
            />
            <p className="media-slider__title pt-1 mb-0">
              {item.title || item.name}
            </p>
          </Link>
        )}
      </motion.div>
    </div>
  );
}

export default MediaSlider;