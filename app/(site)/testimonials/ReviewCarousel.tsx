// components/ReviewCarousel.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Star, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { type Review } from '@/types';
// No need to import urlForImage as the image URL is directly fetched from the query

interface ReviewCardProps {
  review: Review;
  isActive?: boolean;
}

const GoogleLogo = () => (
  <svg 
    viewBox="0 0 272 92" 
    width="24" 
    height="24" 
    className="fill-current text-white"
  >
    <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
    <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" />
    <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" />
    <path d="M225 3v65h-9.5V3h9.5z" />
    <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" />
    <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-20.49.01z" />
  </svg>
);

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    const intervals: { [key: string]: number } = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };
    for (const interval in intervals) {
      const value = Math.floor(seconds / intervals[interval]);
      if (value >= 1) {
        return `${value} ${interval}${value > 1 ? 's' : ''} ago`;
      }
            return 'just now';
          };
    return 'just now';
  };

  const ReviewCard = ({ review, isActive }: ReviewCardProps) => {
    return (
    <div
      className={`bg-gray-900/50 backdrop-blur-lg p-6 rounded-2xl border border-gray-800 transition-all duration-300 ${
        isActive ? 'hover:border-gray-700 shadow-xl' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="relative w-12 h-12">
          <Image
            src={review.profile_photo_url}
            alt={review.author_name}
            fill
            className="rounded-full border-2 border-gray-700 object-cover"
          />
        </div>
        <div>
          <div className="font-medium text-white">{review.author_name}</div>
          <div className="text-sm text-gray-500">{timeAgo(review.time)}</div>
        </div>
      </div>

      <div className="mb-4">
        {Array(5).fill(0).map((_, i) => (
          <Star
            key={i}
            className={`inline-block w-4 h-4 ${
              i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            }`}
          />
        ))}
      </div>

      <p className="text-gray-300 leading-relaxed">{review.text}</p>
    </div>
  );
};

interface ReviewCarouselProps {
  reviews: Review[];
  googleReviewUrl: string;
}

const ReviewCarousel = ({ reviews, googleReviewUrl }: ReviewCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex, handleNext]);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getReviewIndex = (offset: number) => {
    return (activeIndex + offset + reviews.length) % reviews.length;
  };

  if (!reviews.length) return null;

  return (
    <section className="relative min-h-[850px]  py-24 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br via-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-400">
          <GoogleLogo />
            <span className="text-lg">Verified Google Reviews</span>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative h-[400px]">
          {/* Navigation Buttons */}
          <button
            onClick={() => {
              handlePrev();
              setIsAutoPlaying(false);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            aria-label="Previous review"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              handleNext();
              setIsAutoPlaying(false);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all duration-300"
            aria-label="Next review"
          >
            <ArrowRight className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="relative h-full flex items-center justify-center">
            {/* Previous Card */}
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 w-80 transform -translate-x-1/2 scale-75 opacity-50 transition-all duration-500"
              style={{ perspective: '1000px', transform: 'rotateY(45deg)' }}
            >
              <ReviewCard review={reviews[getReviewIndex(-1)]} />
            </div>

            {/* Active Card */}
            <div className="w-96 transform scale-100 opacity-100 z-10 transition-all duration-500">
              <ReviewCard review={reviews[activeIndex]} isActive={true} />
            </div>

            {/* Next Card */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 w-80 transform translate-x-1/2 scale-75 opacity-50 transition-all duration-500"
              style={{ perspective: '1000px', transform: 'rotateY(-45deg)' }}
            >
              <ReviewCard review={reviews[getReviewIndex(1)]} />
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'w-8 bg-white' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="absolute bottom-[-100px] left-1/2 transform -translate-x-1/2 text-center">
          <a
            href={googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-medium border border-gray-800 hover:bg-gray-800 hover:border-gray-700 hover:shadow-lg transition-all duration-300"
          >
            Write a Review on Google
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewCarousel;