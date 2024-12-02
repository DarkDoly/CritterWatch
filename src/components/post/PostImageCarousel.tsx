import { useState } from "react";

interface PostImageCarouselProps {
  imageUrls: string[];
}

function PostImageCarousel({ imageUrls }: PostImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const showNext = () => {
    if (currentImage >= imageUrls.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage(currentImage + 1);
    }
  };

  const showPrevious = () => {
    if (currentImage <= 0) {
      setCurrentImage(imageUrls.length - 1);
    } else {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="my-2">
      <img src={imageUrls[currentImage]} className="card-img-top" alt="" />
      {imageUrls.length > 1 && (
        <>
          <div className="text-center">
            <button className="btn me-2" onClick={showPrevious}>
              Previous
            </button>
            <span>
              {currentImage + 1} | {imageUrls.length}
            </span>
            <button className="btn ms-2" onClick={showNext}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default PostImageCarousel;
