import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import api from "../services/api";

import Hero from "../components/home/Hero";
import FeaturedPackages from "../components/home/FeaturedPackages";
import FeaturedServices from "../components/home/FeaturedServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import GalleryPreview from "../components/home/GalleryPreview";
import FAQ from "../components/home/FAQ";

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    let active = true;

    const fetchHomeData = async () => {
      try {
        const response = await api.get("/services/featured");

        if (!active) return;

        const servicesData =
          response.data?.services ??
          response.data?.data?.services ??
          [];

        setServices(Array.isArray(servicesData) ? servicesData : []);
      } catch (error) {
        console.error("Failed to load homepage services:", error.message);
        if (active) setServices([]);
      }
    };

    fetchHomeData();

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>Coastal Goa | Best Tours, Packages & Travel Services</title>
        <meta
          name="description"
          content="Discover the best of Goa with our handpicked tour packages, luxury stays, cruises, and travel services. Book your unforgettable Goa trip today."
        />
        <meta
          name="keywords"
          content="Goa tours, Goa packages, Goa travel, Dudhsagar Falls, North Goa, South Goa"
        />
        <meta property="og:title" content="Coastal Goa | Best Tours & Packages" />
        <meta
          property="og:description"
          content="Handpicked Goa tour packages, services, and experiences at the best prices."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <main className="min-h-screen w-full overflow-x-hidden bg-white">
        {/* 1. Hero Banner */}
        <Hero />

        {/* 2. Tour Packages */}
        <FeaturedPackages />

        {/* 3. Travel Services — only if we have data */}
        {services.length > 0 && <FeaturedServices services={services} />}

        {/* 4. Why Choose Us */}
        <WhyChooseUs />

        {/* 5. Gallery */}
        <GalleryPreview />

        {/* 6. Frequently Asked Questions */}
        <FAQ />
      </main>
    </>
  );
};

export default Home;