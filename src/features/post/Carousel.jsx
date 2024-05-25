import { useEffect, useRef, useState } from "react"
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

const Carousel = ({ children: images }) => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  // functions
  const incrementIndex = () => {
    if (index < images?.length - 1) setIndex(i => i + 1);
  }
  const decrementIndex = () => {
    if (index > 0) setIndex(i => i - 1);
  }

  // handling swipe
  let x1, x2;
  const getX1 = (e) => {
    x1 = e.targetTouches[0].clientX;
  }
  const getX2 = (e) => {
    x2 = e.changedTouches[e.changedTouches.length - 1].clientX;
    if (x1 > x2) {
      incrementIndex();
    }
    if (x1 < x2) {
      decrementIndex();
    }
  }
  const addSwipeListener = () => {
    ref.current?.addEventListener('touchstart', getX1);
    ref.current?.addEventListener('touchend', getX2);
  }
  const removeSwipeListener = () => {
    ref.current?.removeEventListener('touchstart', getX1);
    ref.current?.removeEventListener('touchend', getX2);
  }
  useEffect(() => {
    addSwipeListener();
    return () => {
      removeSwipeListener();
    }
  }, [index]);

  return (
    <section ref={ref} className={`relative overflow-hidden`} >
      <div className="absolute p-1 bg-[rgba(0,0,0,0.3)] text-white right-0 m-1 z-10 rounded-md">{`${index + 1}/${images?.length}`}</div>
      {
        index + 1 < images?.length && <button onClick={incrementIndex} className="absolute bg-white text-black opacity-40 rounded-full text-3xl right-2 top-[50%] -translate-y-[50%] z-20">
          <MdChevronRight />
        </button>
      }
      {
        index > 0 && <button onClick={decrementIndex} className="absolute bg-white text-black opacity-40 rounded-full text-3xl left-2 top-[50%] -translate-y-[50%] z-10">
          <MdChevronLeft />
        </button>
      }
      <ul style={{ translate: `-${index * 100}%`, transition: 'translate 0.3s ease-out' }} className="whitespace-nowrap">
        {images}
      </ul>
    </section>
  )
}
export default Carousel