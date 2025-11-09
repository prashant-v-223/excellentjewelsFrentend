import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { usePageMeta, StructuredData } from '../utils/SEOMetaHandler';

/**
 * Example 1: Diamond Detail Page with Dynamic Meta
 */
const DiamondDetailExample = () => {
  const { id } = useParams();
  const [diamond, setDiamond] = useState(null);

  useEffect(() => {
    // Fetch diamond data
    fetchDiamondData(id).then(data => setDiamond(data));
  }, [id]);

  // Update meta tags dynamically when diamond data loads
  usePageMeta({
    title: diamond ? `${diamond.carat} Carat ${diamond.shape} Diamond | Excellent Jewels` : 'Diamond Detail',
    description: diamond ? `${diamond.carat}ct ${diamond.shape} diamond, ${diamond.color} color, ${diamond.clarity} clarity. Certified and ready to ship. Price: $${diamond.price}` : 'View diamond details',
    keywords: `${diamond?.shape} diamond, ${diamond?.carat} carat, ${diamond?.color} ${diamond?.clarity}, buy diamond`,
    ogImage: diamond?.image || '/images/diamond-default.jpg',
    canonical: `https://www.excellentjewels.com/diamond-detail/${id}`
  });

  // Add structured data for rich snippets
  const structuredData = diamond ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${diamond.carat} Carat ${diamond.shape} Diamond`,
    "image": diamond.image,
    "description": `${diamond.carat}ct ${diamond.shape} diamond, ${diamond.color} color, ${diamond.clarity} clarity`,
    "brand": {
      "@type": "Brand",
      "name": "Excellent Jewels"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.excellentjewels.com/diamond-detail/${id}`,
      "priceCurrency": "USD",
      "price": diamond.price,
      "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  } : null;

  return (
    <div>
      {structuredData && <StructuredData data={structuredData} />}
      {diamond ? (
        <div>
          <h1>{diamond.carat} Carat {diamond.shape} Diamond</h1>
          {/* Rest of your component */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

/**
 * Example 2: Jewelry Detail Page with Dynamic Meta
 */
const JewelleryDetailExample = () => {
  const { id } = useParams();
  const [jewelry, setJewelry] = useState(null);

  useEffect(() => {
    fetchJewelryData(id).then(data => setJewelry(data));
  }, [id]);

  usePageMeta({
    title: jewelry ? `${jewelry.name} | Excellent Jewels` : 'Jewelry Detail',
    description: jewelry ? `${jewelry.name} - ${jewelry.description}. ${jewelry.metal} with ${jewelry.diamondDetails}. Price: $${jewelry.price}` : 'View jewelry details',
    keywords: `${jewelry?.type}, ${jewelry?.metal} jewelry, diamond ${jewelry?.type}`,
    ogImage: jewelry?.image || '/images/jewelry-default.jpg',
    canonical: `https://www.excellentjewels.com/jewellery-detail/${id}`
  });

  const structuredData = jewelry ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": jewelry.name,
    "image": jewelry.image,
    "description": jewelry.description,
    "brand": {
      "@type": "Brand",
      "name": "Excellent Jewels"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://www.excellentjewels.com/jewellery-detail/${id}`,
      "priceCurrency": "USD",
      "price": jewelry.price,
      "availability": "https://schema.org/InStock"
    },
    "material": jewelry.metal,
    "gemstone": "Diamond"
  } : null;

  return (
    <div>
      {structuredData && <StructuredData data={structuredData} />}
      {/* Your component JSX */}
    </div>
  );
};

/**
 * Example 3: Education Article with Breadcrumb Structured Data
 */
const EducationDetailExample = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticleData(slug).then(data => setArticle(data));
  }, [slug]);

  usePageMeta({
    title: article ? `${article.title} | Diamond Education` : 'Education',
    description: article?.excerpt || 'Learn about diamonds',
    keywords: article?.tags?.join(', ') || 'diamond education',
    ogImage: article?.image || '/images/education-default.jpg',
    canonical: `https://www.excellentjewels.com/education/${slug}`
  });

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.excellentjewels.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Education",
        "item": "https://www.excellentjewels.com/education"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": article?.title,
        "item": `https://www.excellentjewels.com/education/${slug}`
      }
    ]
  };

  const articleData = article ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": article.image,
    "author": {
      "@type": "Organization",
      "name": "Excellent Jewels"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Excellent Jewels",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.excellentjewels.com/logo.png"
      }
    },
    "datePublished": article.publishedDate,
    "dateModified": article.modifiedDate
  } : null;

  return (
    <div>
      {breadcrumbData && <StructuredData data={breadcrumbData} />}
      {articleData && <StructuredData data={articleData} />}
      {/* Your component JSX */}
    </div>
  );
};

/**
 * Example 4: Blog Post with FAQ Structured Data
 */
const BlogPostWithFAQ = () => {
  const faqs = [
    {
      question: "What are lab-grown diamonds?",
      answer: "Lab-grown diamonds are real diamonds created in a laboratory using advanced technology that replicates the natural diamond formation process."
    },
    {
      question: "Are lab-grown diamonds real?",
      answer: "Yes, lab-grown diamonds are 100% real diamonds with the same physical, chemical, and optical properties as natural diamonds."
    }
  ];

  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  usePageMeta({
    title: "Lab-Grown Diamond FAQs | Everything You Need to Know",
    description: "Get answers to frequently asked questions about lab-grown diamonds. Learn about their quality, value, and how they compare to natural diamonds.",
    keywords: "lab grown diamond faq, diamond questions, lab diamond guide",
    canonical: "https://www.excellentjewels.com/education/lab-grown-diamond-faq"
  });

  return (
    <div>
      <StructuredData data={faqStructuredData} />
      <h1>Frequently Asked Questions</h1>
      {faqs.map((faq, index) => (
        <div key={index}>
          <h2>{faq.question}</h2>
          <p>{faq.answer}</p>
        </div>
      ))}
    </div>
  );
};

// Mock fetch functions (replace with your actual API calls)
const fetchDiamondData = async (id) => {
  // Your API call here
  return {
    id,
    carat: 1.5,
    shape: 'Round',
    color: 'D',
    clarity: 'VS1',
    price: 8500,
    image: '/images/diamonds/123.jpg'
  };
};

const fetchJewelryData = async (id) => {
  // Your API call here
  return {
    id,
    name: 'Classic Solitaire Ring',
    description: 'Elegant solitaire engagement ring',
    type: 'engagement ring',
    metal: '18K White Gold',
    diamondDetails: '1.0ct center diamond',
    price: 12500,
    image: '/images/jewelry/456.jpg'
  };
};

const fetchArticleData = async (slug) => {
  // Your API call here
  return {
    slug,
    title: 'Understanding the 4Cs of Diamonds',
    excerpt: 'Learn about Cut, Color, Clarity, and Carat weight',
    tags: ['diamond education', '4Cs', 'buying guide'],
    image: '/images/education/4cs.jpg',
    publishedDate: '2024-01-15',
    modifiedDate: '2024-10-01'
  };
};

export {
  DiamondDetailExample,
  JewelleryDetailExample,
  EducationDetailExample,
  BlogPostWithFAQ
};