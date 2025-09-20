/**
 * FinancialNewsCarouselLanding Component
 * 
 * A Netflix-style horizontal carousel component that displays financial news from NewsAPI.
 * Features include:
 * - Horizontal scrollable carousel with navigation arrows
 * - News cards with image, title, description, date, and source
 * - Modal popup for full article display
 * - Loading and error states
 * - Responsive design for desktop and mobile
 * - Smooth animations and hover effects
 * 
 * Usage:
 * <FinancialNewsCarouselLanding />
 * 
 * Dependencies:
 * - React hooks (useState, useEffect, useRef)
 * - Tailwind CSS for styling
 * - @tailwindcss/line-clamp plugin for text truncation
 * - NewsAPI for financial news data
 */

import React, { useEffect, useRef, useState } from 'react';

const FinancialNewsCarouselLanding = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const carouselRef = useRef(null);

  // Fetch financial news from NewsAPI
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        
        // For now, use mock data to demonstrate the component
        // In production, you would call your server-side API
        const mockNews = [
          {
            id: 1,
            title: "Federal Reserve Signals Potential Interest Rate Cuts in 2024",
            description: "The Federal Reserve hints at possible rate reductions as inflation shows signs of cooling down.",
            fullDescription: "The Federal Reserve has indicated that it may consider cutting interest rates in 2024 as inflation continues to show signs of cooling. This comes after a series of aggressive rate hikes over the past two years. The central bank's latest statement suggests a more dovish stance as economic indicators point to a potential soft landing.",
            publishedAt: new Date().toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Financial Times",
            url: "https://example.com/news1"
          },
          {
            id: 2,
            title: "Stock Market Reaches New All-Time High Amid Tech Rally",
            description: "Major indices hit record levels as technology stocks lead the market higher.",
            fullDescription: "The stock market has reached new all-time highs as technology stocks continue their impressive rally. The S&P 500, Dow Jones, and NASDAQ all closed at record levels, driven by strong earnings reports and optimistic outlooks from major tech companies.",
            publishedAt: new Date(Date.now() - 3600000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Wall Street Journal",
            url: "https://example.com/news2"
          },
          {
            id: 3,
            title: "Cryptocurrency Market Shows Signs of Recovery",
            description: "Bitcoin and other major cryptocurrencies are showing renewed strength after recent volatility.",
            fullDescription: "The cryptocurrency market is showing signs of recovery as Bitcoin and other major digital assets gain momentum. After a period of significant volatility, investors are showing renewed confidence in the sector, with trading volumes increasing across major exchanges.",
            publishedAt: new Date(Date.now() - 7200000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "CoinDesk",
            url: "https://example.com/news3"
          },
          {
            id: 4,
            title: "Global Economic Growth Forecast Revised Upward",
            description: "IMF raises global growth projections for 2024, citing stronger than expected recovery.",
            fullDescription: "The International Monetary Fund has revised its global economic growth forecast upward for 2024, citing a stronger than expected recovery across major economies. The updated projections suggest that the global economy is on track for a more robust recovery than previously anticipated.",
            publishedAt: new Date(Date.now() - 10800000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Reuters",
            url: "https://example.com/news4"
          },
          {
            id: 5,
            title: "Banking Sector Reports Strong Q4 Earnings",
            description: "Major banks exceed expectations with robust quarterly results and optimistic outlooks.",
            fullDescription: "The banking sector has reported strong fourth-quarter earnings, with major financial institutions exceeding analyst expectations. The results reflect improved loan performance, higher interest income, and strong capital positions across the industry.",
            publishedAt: new Date(Date.now() - 14400000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Bloomberg",
            url: "https://example.com/news5"
          },
          {
            id: 6,
            title: "Real Estate Market Shows Mixed Signals in Q4",
            description: "Housing prices stabilize while commercial real estate faces headwinds in the current quarter.",
            fullDescription: "The real estate market is showing mixed signals as we enter the fourth quarter. While residential housing prices have shown signs of stabilization, commercial real estate continues to face challenges with rising vacancy rates and changing work patterns affecting office space demand.",
            publishedAt: new Date(Date.now() - 18000000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Real Estate Weekly",
            url: "https://example.com/news6"
          },
          {
            id: 7,
            title: "Energy Sector Sees Renewed Investment in Green Technologies",
            description: "Major oil companies announce increased spending on renewable energy projects and carbon capture initiatives.",
            fullDescription: "The energy sector is experiencing a significant shift as major oil and gas companies announce substantial investments in green technologies. These initiatives include renewable energy projects, carbon capture and storage systems, and hydrogen fuel development, signaling a long-term commitment to sustainability.",
            publishedAt: new Date(Date.now() - 21600000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Energy Today",
            url: "https://example.com/news7"
          },
          {
            id: 8,
            title: "International Trade Agreements Boost Economic Outlook",
            description: "New trade partnerships expected to increase exports and strengthen global supply chains.",
            fullDescription: "Recent international trade agreements are expected to provide a significant boost to the global economic outlook. These partnerships aim to increase exports, strengthen supply chains, and reduce trade barriers, potentially leading to increased economic growth and job creation across multiple sectors.",
            publishedAt: new Date(Date.now() - 25200000).toISOString(),
            urlToImage: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            source: "Global Trade Review",
            url: "https://example.com/news8"
          }
        ];
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setNews(mockNews);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format date to "MMM dd, HH:mm" format
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } catch {
      return 'Invalid date';
    }
  };

  // Scroll carousel left
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -320, // 300px card width + 20px gap
        behavior: 'smooth'
      });
    }
  };

  // Scroll carousel right
  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 320, // 300px card width + 20px gap
        behavior: 'smooth'
      });
    }
  };

  // Open modal with selected article
  const openModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );

  // Error message component
  const ErrorMessage = ({ errorMessage }) => (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <div className="text-red-500 text-xl mb-2">⚠️</div>
        <p className="text-red-600 font-medium">Failed to load financial news</p>
        <p className="text-gray-600 text-sm mt-1">{errorMessage || 'Unknown error occurred'}</p>
      </div>
    </div>
  );

  // News card component
  const NewsCard = ({ article }) => (
    <div
      className="flex-shrink-0 w-[300px] h-[200px] bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
      onClick={() => openModal(article)}
    >
      {/* Image container */}
      <div className="relative h-24 overflow-hidden">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>
      
      {/* Content */}
      <div className="p-3 h-32 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-sm text-gray-900 leading-tight overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {article.title}
          </h3>
          <p className="text-xs text-gray-600 mt-1 leading-tight overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {article.description}
          </p>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
          <span>{formatDate(article.publishedAt)}</span>
          <span className="font-medium">{article.source}</span>
        </div>
      </div>
    </div>
  );

  // Modal component
  const Modal = () => {
    if (!isModalOpen || !selectedArticle) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
          onClick={closeModal}
        ></div>
        
        {/* Modal content */}
        <div className="relative bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100">
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          {/* Modal body */}
          <div className="overflow-y-auto max-h-[90vh]">
            {/* Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={selectedArticle.urlToImage}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2Y3ZjdmNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOTk5Ij5JbWFnZSBVbmF2YWlsYWJsZTwvdGV4dD48L3N2Zz4=';
                }}
              />
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {selectedArticle.title}
              </h2>
              
              <div className="flex items-center text-sm text-gray-600 mb-4">
                <span className="mr-4">{formatDate(selectedArticle.publishedAt)}</span>
                <span className="font-medium">{selectedArticle.source}</span>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {selectedArticle.fullDescription}
                </p>
              </div>
              
              {selectedArticle.url && (
                <div className="mt-6">
                  <a
                    href={selectedArticle.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Read Full Article
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Financial News</h2>
        <p className="text-gray-600">Stay updated with the latest financial market news and insights</p>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage errorMessage={error} />
      ) : news.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="text-gray-400 text-xl mb-2">📰</div>
            <p className="text-gray-600 font-medium">No news articles found</p>
            <p className="text-gray-500 text-sm mt-1">Try refreshing the page</p>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Left arrow button */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right arrow button */}
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Carousel container */}
          <div
            ref={carouselRef}
            className="flex space-x-5 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {news.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}

      {/* Modal */}
      <Modal />
    </div>
  );
};

export default FinancialNewsCarouselLanding;
