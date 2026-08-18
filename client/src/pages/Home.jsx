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
  const [gallery, setGallery] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      setLoading(true);

      const [
        servicesRes,
        galleryRes,
      ] = await Promise.all([
        api.get("/services/featured"),
        api.get("/gallery/featured"),
      ]);

      setServices(servicesRes.data.services || []);
      setGallery(galleryRes.data.gallery || []);

      // These routes don't exist yet, so keep them empty for now.
      setReviews([]);
      setFaqs([]);

    } catch (error) {
      console.error("Failed to load home page", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Hero />

      {/* This component fetches its own packages */}
      <FeaturedPackages />

      <FeaturedServices services={services} />

      <WhyChooseUs />

      <GalleryPreview images={gallery} />

      <FAQ faqs={faqs} />
    </>
  );
};

export default Home;