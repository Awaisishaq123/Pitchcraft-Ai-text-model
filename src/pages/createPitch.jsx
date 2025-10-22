import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { generatePitch, generateLandingPageCode } from "../config/gemeni/";
import { uploadToCloudinary } from "../config/cloudinary";
import { jsPDF } from "jspdf";
import { useAuth } from "../context/Authcontext";
import { useNavigate } from "react-router-dom";

export default function CreatePitch({ darkMode }) {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState(null);
  const [previewHTML, setPreviewHTML] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🧠 Detect Roman Urdu
  const isRomanUrdu = (text) => {
    const romanWords = ["ka", "hai", "mein", "tum", "aur", "mera", "kya"];
    return romanWords.some((word) => text.toLowerCase().includes(word));
  };

  // 🚀 Generate Pitch + AI Image
  const handleGeneratePitch = async () => {
    if (!idea.trim()) return alert("Please enter your idea first!");
    setLoading(true);

    try {
      const inputLang = isRomanUrdu(idea) ? "Roman Urdu" : "English";

      // 🧠 Generate pitch with Unsplash image link
      const aiPitch = await generatePitch(
        `Generate a creative startup pitch in ${inputLang} for this idea: "${idea}".
         Include:
         1. Startup name
         2. Tagline
         3. A detailed but concise pitch paragraph
         4. A valid Unsplash image URL like "https://source.unsplash.com/800x600/?<related-keyword>"
         Return data as a structured JSON with keys: startupName, tagline, pitch, image.`
      );

      // 🖼️ Validate or fallback image
      let imageUrl = aiPitch.image;
      if (!imageUrl || !imageUrl.startsWith("http")) {
        imageUrl =
          "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80";
      }

      // 🧩 Try Cloudinary upload (optional)
      let uploadedImageUrl = "";
      try {
        const imageBlob = await fetch(imageUrl).then((res) => res.blob());
        uploadedImageUrl = await uploadToCloudinary(imageBlob);
      } catch (err) {
        console.warn("⚠️ Cloudinary upload failed, using original Unsplash image:", err);
      }

      // ✅ Final result
      const finalResult = {
        ...aiPitch,
        image: uploadedImageUrl || imageUrl,
      };

      // 💻 Generate Landing Page HTML
      const htmlCode = await generateLandingPageCode(finalResult);

      // 💾 Save to Firestore
      await addDoc(collection(db, "pitches"), {
        userId: user.uid,
        idea,
        result: finalResult,
        language: inputLang,
        createdAt: Timestamp.now(),
      });

      setResult(finalResult);
      setPreviewHTML(htmlCode);
      setShowModal(true);

      alert(`✅ ${inputLang} pitch generated successfully!`);
    } catch (err) {
      console.error("Error generating pitch:", err);
      alert("❌ Error generating pitch. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // 📄 Download PDF
  const handleDownloadPDF = () => {
    if (!result) return;
    const pdf = new jsPDF();
    pdf.text(`Startup: ${result.startupName}`, 10, 10);
    pdf.text(`Tagline: ${result.tagline}`, 10, 20);
    pdf.text(`Pitch: ${result.pitch}`, 10, 30);
    pdf.save(`${result.startupName}.pdf`);
  };

  // 📋 Copy React Code
  const handleCopyCode = () => {
    const reactCode = `
export default function LandingPage() {
  return (
    <>
      ${previewHTML
        .replace(/class=/g, "className=")
        .replace(/for=/g, "htmlFor=")}
    </>
  );
}`;
    navigator.clipboard.writeText(reactCode);
    alert("✅ React code copied!");
  };

  // 🌐 View Landing Page
  const handleViewLandingPage = () => {
    localStorage.setItem("landingHTML", previewHTML);
    navigate("/landingpage");
  };

  return (
    <div
      className={`min-h-screen p-6 flex flex-col items-center ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white"
          : "bg-gradient-to-br from-gray-50 via-gray-100 to-white text-gray-900"
      } transition-all duration-700`}
    >
      {/* Input Card */}
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          ✨ AI Startup Pitch Generator
        </h1>

        <textarea
          placeholder="Describe your startup idea (English or Roman Urdu)..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="w-full border rounded-xl p-4 text-gray-800 shadow-sm focus:ring-2 focus:ring-indigo-400"
          rows="4"
        ></textarea>

        <button
          onClick={handleGeneratePitch}
          disabled={loading}
          className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-500 transition-all"
        >
          {loading ? "⚙️ Generating..." : "⚡ Generate Pitch"}
        </button>
      </div>

      {/* Result Card */}
      {result && (
        <div className="w-full max-w-3xl mt-10 bg-white rounded-2xl shadow-xl p-6 border border-gray-200 transition-all">
          <h2 className="text-2xl font-bold text-indigo-700 mb-2">
            {result.startupName}
          </h2>
          <p className="text-gray-600 text-lg mb-4 italic">{result.tagline}</p>

          {result.image && (
            <div className="flex justify-center mb-4">
              <img
                src={result.image}
                alt="Startup Visual"
                className="rounded-xl shadow-md w-full max-w-md object-cover"
              />
            </div>
          )}

          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
            {result.pitch}
          </p>

          <div className="flex flex-wrap justify-end gap-3 mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
            >
              🔍 View Preview
            </button>
            <button
              onClick={handleViewLandingPage}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
            >
              🌐 View Landing Page
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden relative text-gray-800 animate-fadeIn">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 bg-red-500 text-white rounded-full w-8 h-8"
            >
              ✕
            </button>

            <div className="p-6 overflow-auto h-[75vh]">
              <h2 className="text-3xl font-bold text-indigo-700 mb-2">
                {result.startupName}
              </h2>
              <p className="text-lg text-gray-600 mb-3">{result.tagline}</p>

              {result.image && (
                <div className="flex justify-center my-4">
                  <img
                    src={result.image}
                    alt="Startup Visual"
                    className="rounded-xl shadow-md w-full max-w-md object-cover"
                  />
                </div>
              )}

              <p className="text-gray-700 whitespace-pre-line">{result.pitch}</p>

              <iframe
                srcDoc={previewHTML}
                className="w-full h-64 border mt-6 rounded-lg shadow-inner"
                title="Landing Page Preview"
              />
            </div>

            <div className="flex flex-wrap justify-end gap-3 p-4 bg-gray-100 border-t">
              <button
                onClick={handleDownloadPDF}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
              >
                📄 Download PDF
              </button>
              <button
                onClick={handleCopyCode}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-500"
              >
                📋 Copy Code
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
