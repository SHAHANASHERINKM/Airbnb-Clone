import React from 'react';

export default function ImageSection({ images }) {
  if (!images || images.length === 0) return null;

  const mainImage = images[0];
  const smallImages = images.slice(1, 5);

  return (
    <div className="w-full mt-10">
      <div className="grid md:grid-cols-3 gap-4">

        {/* Large Image */}
        <div className="md:col-span-2 h-64 md:h-[380px] rounded-lg overflow-hidden">
          <img
            src={mainImage.url}
            alt="Main"
            className="w-full h-full object-cover "
          />
        </div>

        {/* Small Images Grid */}
        <div className="grid grid-cols-2 gap-4 h-64 md:h-[380px]">
          {smallImages.map((img) => (
            <div key={img._id} className="h-full rounded-lg overflow-hidden">
              <img
                src={img.url}
                alt="Small"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
