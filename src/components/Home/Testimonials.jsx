import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { reviews } from './reviewsData';
import Quote from './../../assets/blockquote.svg';
import './testi.css'

const Testimonials = () => {
  return (
    <section className="testimonial-container max-w-7xl mx-auto w-[95%] my-[25px] text-white">
      <div className="title">
        <h2 className='text-5xl font-bold'>What People Are Saying</h2>
        
      </div>

      <div className="slider-container">
        <blockquote>
          <img className="top-quote quote" src={Quote} alt="quote" />
          <img className="bottom-quote quote" src={Quote} alt="quote" />
        </blockquote>

        <Splide
          options={{
            perPage: 1,
            autoplay: true,
            speed: 1000,
            rewind: true,
            rewindByDrag: true,
          }}
        >
          {reviews.map((review) => (
            <SplideSlide key={review.id}>
              <img className="w-[140px] h-[140px] rounded-[50%] object-cover mb-[1rem]" src={review.image} alt="" />
              <div className="content text-white">
           

                <p className="text-gray-200 mb-[1rem] text-[1.1rem]">{review.text}</p>
                <div className="info">
                  <div className="rating">
                    ratting
                  </div>
                  <p className="font-semibold">{review.name}</p>
                </div>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;