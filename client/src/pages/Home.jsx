import { useEffect, useState } from "react";
import api from "../services/api";

import Hero from "../components/home/Hero";
import FeaturedPackages from "../components/home/FeaturedPackages";
import FeaturedServices from "../components/home/FeaturedServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import GalleryPreview from "../components/home/GalleryPreview";
import FAQ from "../components/home/FAQ";
import Loader from "../components/common/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
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

        setServices(
          Array.isArray(servicesData) ? servicesData : []
        );
      } catch (error) {
        console.error(
          "Failed to load homepage services:",
          error
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchHomeData();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Tour Packages */}
      <FeaturedPackages />

      {/* 3. Travel Services */}
      {services.length > 0 && (
        <FeaturedServices services={services} />
      )}

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Gallery */}
      <GalleryPreview />

      {/* 6. Frequently Asked Questions */}
      <FAQ />
    </main>
  );
};

export default Home;