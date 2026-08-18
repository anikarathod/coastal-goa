import { FaStar, FaRegStar } from "react-icons/fa";

const Rating = ({ value = 5 }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) =>
        star <= value ? (
          <FaStar
            key={star}
            className="text-yellow-400"
          />
        ) : (
          <FaRegStar
            key={star}
            className="text-yellow-400"
          />
        )
      )}
    </div>
  );
};

export default Rating;