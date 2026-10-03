import { useEffect, useState } from "react";
import api from "../services/api";

import Hero from "../components/home/Hero";
import FeaturedPackages from "../components/home/FeaturedPackages";
import FeaturedServices from "../components/home/FeaturedServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import GalleryPreview from "../components/home/GalleryPreview";
import FAQ from "../components/home/FAQ";
import Footer from "../components/layout/Footer";
import StickyContactButtons from "../components/common/StickyContactButtons";
import Loader from "../components/common/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const [servicesRes, galleryRes] = await Promise.all([
        api.get("/services/featured"),
        api.get("/gallery/featured"),
      ]);

      setServices(servicesRes.data?.services || []);
      setGallery(galleryRes.data?.gallery || []);
    } catch (error) {
      console.error("Failed to load home page", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Packages Added By Admin */}
      <FeaturedPackages />

      {/* Services Added By Admin */}
      <FeaturedServices services={services} />

      {/* Gallery Added By Admin */}
      <GalleryPreview images={gallery} />

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <Footer />

      {/* Sticky Buttons */}
      <StickyContactButtons />
    </>
  );
};

export default Home;