import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
import img1 from '../images/ipl.jpg';
import img2 from '../images/banner/image.png';
import img3 from '../images/banner/images.jpg';
import img4 from '../images/banner/image2.png';
import './HomePage.css';

export const HomePage = () => {
  const cricketImages = [img1, img2, img3, img4];
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedArticles = sessionStorage.getItem('articles');
    if (cachedArticles) {
      setArticles(JSON.parse(cachedArticles));
      setLoading(false);
    } else {
      fetch('http://localhost:8801/articles', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch articles');
          }
          return response.json();
        })
        .then((data) => {
          setArticles(data || []);
          sessionStorage.setItem('articles', JSON.stringify(data));
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, []);

  return (
    <div className="homepage-container">
      {/* Main content with Swiper */}
      <div className="content">
        <Swiper
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay, Navigation, Pagination]}
          pagination={{ clickable: true }}
          className="mySwiper"
        >
          {cricketImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Slide ${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Latest Articles Section */}
      <div className="latest-articles container mt-5">
        <h2 className="mb-4">Latest Articles</h2>

        {/* Display loading, error, or articles */}
        {loading ? (
          <p>Loading articles...</p>
        ) : error ? (
          <p className="text-danger">Error: {error}</p>
        ) : articles.length > 0 ? (
          <div className="row">
            {articles.map((article, index) => (
              <a href={article.link || '#'} className="text-decoration-none" key={index}>
                <div className="col-12 mb-4">
                  <div className="card h-100">
                    <div className="row g-0">
                      {/* Image Column */}
                      <div className="col-md-4 d-flex align-items-center">
                        <img
                          src={article.imgSrc || img1}
                          className="img-fluid rounded-start"
                          alt={`Article ${index}`}
                          style={{ height: '100%', objectFit: 'cover' }} // Ensure the image takes full height
                        />
                      </div>

                      {/* Text Column */}
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{article.title}</h5>
                          <p className="card-text">{article.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p>No articles available.</p>
        )}
      </div>
    </div>
  );
};
