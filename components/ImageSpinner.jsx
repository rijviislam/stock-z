"use client"; // This ensures it's a client component

import ReactProductSpinner from "react-product-spinner";

export default function ImageSpinner({ image }) {
  return (
    <div>
      <ReactProductSpinner images={[image]} infinite={true} speed={3} />
    </div>
  );
}
