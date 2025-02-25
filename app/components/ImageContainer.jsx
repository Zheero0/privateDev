"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ImageContainer = ({ images }) => {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const changeMainImage = (index) => {
    setMainImageIndex(index);
  };

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const nextImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setModalImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Show up to 4 thumbnails excluding the main image
  const thumbnails = images
    .filter((_, idx) => idx !== mainImageIndex)
    .slice(0, 4);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Image Column (50%) */}
        <div className="w-full md:w-3/5 h-96 overflow-hidden rounded-lg flex items-center justify-center bg-gray-100">
          <img
            src={images[mainImageIndex]}
            alt="Main Image"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Thumbnails Grid Column (50%) */}
        <div className="relative w-full md:w-2/5 h-96 grid grid-cols-2 grid-rows-2 gap-2">
          {thumbnails.map((image, index) => (
            <div
              key={index}
              className="w-full h-full rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition"
              onClick={() => {
                // Find the index of the thumbnail in the original array
                const newIndex = images.findIndex(
                  (img, i) => i !== mainImageIndex && img === image
                );
                if (newIndex !== -1) changeMainImage(newIndex);
              }}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
          {/* Show More Button: Positioned at bottom-right of the grid */}
          <div className="absolute bottom-2 right-2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button
                  className="bg-white text-black hover:bg-gray-200 shadow-md"
                  onClick={() => openModal(mainImageIndex)}
                >
                  Show More
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] p-0 overflow-hidden">
                <div className="relative w-full h-full">
                  <img
                    src={images[modalImageIndex]}
                    alt="Modal Image"
                    className="w-full h-full object-contain"
                  />
                  <Button
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200"
                    onClick={prevImage}
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black hover:bg-gray-200"
                    onClick={nextImage}
                  >
                    <ChevronRight />
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageContainer;
