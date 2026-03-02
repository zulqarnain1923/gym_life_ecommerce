import React from "react"

import { Upload, X} from 'lucide-react';


function Imagesfield({ images, handleImageChange, removeImage, darkMode }) {
    return (
        <div className={`p-6 rounded-2xl ps-3 mt-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50 border-1 border-gray-300'}`}>
            <h2 className="text-xl font-semibold mb-4">Product Images</h2>
            <div className="flex flex-wrap gap-4 mb-4">
                {images.map((img, index) => (
                    <div key={index} className="relative w-24 h-24">
                        <img src={img} className="w-full h-full object-cover rounded-lg" alt="preview" />
                        <button onClick={(e) => removeImage(e, index)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                            <X size={14} />
                        </button>
                    </div>
                ))}
                <label
                    className={`w-24 h-24 p-1 flex flex-col items-center justify-center text-center border-2 border-dashed rounded-lg cursor-pointer ${darkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'
                        }`}
                >
                    <Upload size={24} className="mx-auto" />
                    <span className="text-[10px] mt-1">Upload</span>
                    <input type="file" name="images" multiple required onChange={handleImageChange} accept=".png,.webp" className="hidden" />
                </label>
            </div>
        </div>
    )
}


export default Imagesfield;