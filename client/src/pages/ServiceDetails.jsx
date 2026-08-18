import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import api from "../services/api";

import Loader from "../components/common/Loader";

import ServiceDetailsComponent from "../components/services/ServiceDetails";

const ServiceDetails = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchService();
  }, [id]);

  const fetchService = async () => {
    try {
      setLoading(true);

      console.log("Service ID:", id);

      const serviceRes = await api.get(`/services/${id}`);

setService(serviceRes.data.service || serviceRes.data);
setReviews([]);
    } catch (err) {
      console.error("Service Fetch Error:", err);
      setService(null);
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

  if (!service) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-3xl font-bold">
          Service Not Found
        </h2>

        <p className="mt-4 text-gray-500">
          The requested service could not be found.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Service Information */}
        <ServiceDetailsComponent service={service} />

      </div>
    </section>
  );
};

export default ServiceDetails;