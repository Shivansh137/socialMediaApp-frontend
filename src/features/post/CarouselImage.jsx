const CarouselImage = ({ src, ratio }) => {
  if (ratio) return (
    <li style={{ backgroundImage: `url(${src})`, paddingTop: ratio?.charAt(2) / ratio?.charAt(0) * 100 + '%' }} className={`w-full inline-block bg-no-repeat bg-cover bg-center snap-center snap-always box-border`} alt="" >
    </li>
  )
}
export default CarouselImage