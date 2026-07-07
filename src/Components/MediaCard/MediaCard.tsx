import './MediaCard.scss';
import { Media } from '../../types/Media';
import { titleCrop } from '../../Utils/titleCrop';

const MediaCard = ({ media }: { media: Media }) => {
    return (
        <div className='media-card'>
          <div className="media-card__cover">
            <img src={`https://image.tmdb.org/t/p/w500/${media.poster_path}`}
              alt={media.title || media.name}
            />
          </div>
          <div className='media-card__title'>
            {titleCrop(media.title || media.name, 20)}
          </div>
        </div>
    );
}

export default MediaCard;
