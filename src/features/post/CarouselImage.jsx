const CarouselImage = ({src, ratio}) => {
  if(ratio) return (
    <li style={{backgroundImage:`url(${src})`, paddingTop:ratio?.charAt(2)/ratio?.charAt(0)*100+'%'}}  className={`w-full inline-block bg-no-repeat bg-cover`} alt="" >
    </li>
  )
}
export default CarouselImage