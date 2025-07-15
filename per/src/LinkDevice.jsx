import React, { useState, useEffect } from 'react';

const LinkDevice = () => {
  const [image, setImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);

  useEffect(() => {
    const storedImage = localStorage.getItem('linkedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setImage(dataUrl);
        localStorage.setItem('linkedImage', dataUrl);
        // In a full app, upload to backend/database for real-time sync with other users.
      };
      reader.readAsDataURL(file);
    }
    setShowUploadModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-white mb-10">How to Link Device with Perplexity</h1>

      {/* Admin upload section */}
      <button 
        onClick={() => setShowUploadModal(true)}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Admin: Upload Image
      </button>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Linked Image</h2>
          {image ? (
            <img src={image} alt="Linked device" className="w-full h-auto rounded" />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded">
              Placeholder Image
            </div>
          )}
          <button 
            onClick={() => setShowLinkModal(true)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Link
          </button>
        </div>

        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Instructions</h2>
          <p className="text-gray-700">
            Follow these steps to link your device with Perplexity. Make sure your device is connected and follow the on-screen instructions.
          </p>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Upload Image</h3>
            <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />
            <button 
              onClick={() => setShowUploadModal(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Device Link URL</h3>
            <p className="text-blue-600 mb-4">https://perplexity.ai/device-link</p>
            <button 
              onClick={() => setShowLinkModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkDevice; 