import PlaceCard from "./PlaceCard";

const PlaceGrid = ({ places = [], totalCount = 0, onClearFilters }) => {
  if (!places.length) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400 text-2xl">
          🏝️
        </div>
        <h2 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
          No places found
        </h2>
        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">
          {totalCount === 0
            ? "Places will appear here soon."
            : "Try a different category or search term."}
        </p>
        {totalCount > 0 && onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Clear filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <p className="text-xs font-medium text-slate-500 sm:text-sm">
          {places.length} place{places.length !== 1 && "s"} found
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-5">
        {places.map((place) => (
          <PlaceCard key={place._id || place.id} place={place} />
        ))}
      </div>
    </section>
  );
};

export default PlaceGrid;