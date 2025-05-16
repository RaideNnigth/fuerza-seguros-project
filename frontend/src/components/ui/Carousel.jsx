import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';

export default function Carousel({ images }) {
  const [sliderRef] = useKeenSlider({ loop: true });

  return (
    <div ref={sliderRef} className="keen-slider my-6 rounded-lg overflow-hidden">
      {images.map((src, i) => (
        <div key={i} className="keen-slider__slide">
          <img src={src} className="w-full object-cover" />
        </div>
      ))}
    </div>
  );
}
