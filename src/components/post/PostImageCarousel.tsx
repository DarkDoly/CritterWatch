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

  console.log(currentImage);
  return (
    <div>
      <img src={imageUrls[currentImage]} className="card-img-top" alt="" />
      <div className="text-center">
        <button className="btn" onClick={showPrevious}>
          Previous
        </button>
        <span>
          | {currentImage + 1} / {imageUrls.length} |
        </span>
        <button className="btn" onClick={showNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PostImageCarousel;
