"use client"

import Image from "next/image";
import Link from "next/link";

const AppInfoSection = () => {
  return (
    <section className="bg-white py-20 my-20">
      <div className="container">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-md-6">
            <h4 className="text-dark fw-bold mb-4">The Kissan Growth Mobile App</h4>
            <p className="text-muted">
              The Kissan Growth Mobile App bridges the gap between farmers and consumers.
              Explore and buy fresh farm products like vegetables, fruits, dairy, and crops
              directly from farmers — no middlemen, just fair pricing and freshness.
            </p>

            <h4 className="mt-5 text-dark fw-semibold">Join the Kissan Growth Community</h4>
            <p className="text-muted">
              Whether you're a farmer wanting to grow your reach or a consumer seeking farm-fresh
              produce, the Kissan Growth app is your gateway to India's agri-revolution.
            </p>

            <p className="fw-semibold text-dark">
              Download the app today and support sustainable agriculture by buying directly from local farmers.
            </p>

            {/* ✅ Fixed Link */}
            <Link href="/download" className="btn btn-success btn-lg mt-4">
              Download Now
            </Link>
          </div>

          {/* Image Section */}
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <Image
              src="https://via.placeholder.com/400x500.png?text=Kissan+Growth+App"
              alt="Kissan Growth App Screenshot"
              width={400}
              height={500}
              className="rounded shadow"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppInfoSection;
