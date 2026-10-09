
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

  useEffect(() => {
    let active = true;

    const fetchHomeData = async () => {
      try {
        setLoading(true);

        const [servicesRes, galleryRes] = await Promise.all([
          api.get("/services/featured"),
          api.get("/gallery/featured"),
        ]);

        if (!active) return;

        const servicesData =
          servicesRes.data?.services ??
          servicesRes.data?.data?.services ??
          [];

        const galleryData =
          galleryRes.data?.gallery ??
          galleryRes.data?.data?.gallery ??
          [];

        setServices(Array.isArray(servicesData) ? servicesData : []);
        setGallery(Array.isArray(galleryData) ? galleryData : []);
      } catch (error) {
        console.error("Failed to load homepage content:", error);
      } finally {
        if (active) setLoading(false);
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
      {/* Beach hero banner */}
      <Hero />

      {/* Benefits */}
      <WhyChooseUs />

      {/* Only packages provided by the existing component/API */}
      <FeaturedPackages />

      {/* Only services returned by the backend */}
      {services.length > 0 && (
        <FeaturedServices services={services} />
      )}

      {/* Only gallery images returned by the backend */}
      {gallery.length > 0 && (
        <GalleryPreview images={gallery} />
      )}

      {/* Frequently asked questions */}
      <FAQ />
    </main>
  );
};

export default Home;
