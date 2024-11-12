interface PostImageCarouselProps {
  imageUrls: string[];
}

function PostImageCarousel({ imageUrls }: PostImageCarouselProps) {
  return (
    <div>
      <img src={imageUrls[0]} className="card-img-top" alt="" />
    </div>
  );
}

export default PostImageCarousel;
