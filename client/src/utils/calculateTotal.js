import { GST_PERCENTAGE } from "./constants";

const calculateTotal = ({
  packagePrice = 0,
  services = [],
  adults = 1,
  children = 0,
}) => {
  const serviceTotal = services.reduce(
    (sum, service) => sum + Number(service.price || 0),
    0
  );

  const subtotal =
    (Number(packagePrice) + serviceTotal) *
    (Number(adults) + Number(children));

  const gst = (subtotal * GST_PERCENTAGE) / 100;

  const total = subtotal + gst;

  return {
    subtotal,
    gst,
    total,
  };
};

export default calculateTotal;