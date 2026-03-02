import React from "react"
import {X, Plus } from 'lucide-react';



function Varients({ colors, sizes,keywords,weights,tempweight,setTempweight,tempkeyw,setTempkeyw, tempColor, tempSize, setTempColor, setTempSize, addTag, removecolor, handeladd, darkMode, }) {
    return (
        <div className={`p-6 rounded-2xl p-3 mt-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50 border-1 border-gray-300'}`}>
            <h2 className="text-xl font-semibold mb-4">Variants</h2>
            {/* keywords */}
            <div className="mb-4">
                <label className="block text-sm mb-1">Relatd Keywords</label>
                <div className="flex gap-2 mb-2">
                    <input
                        value={tempkeyw}
                        name="colors"
                        onChange={(e) => setTempkeyw(e.target.value)}
                        onKeyDown={(e) => handeladd(e, 'keyw')}
                        type="text"
                        className={`flex-1 p-2 rounded border-1 placeholder-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                        placeholder="e.g. Red"
                    />
                    <button type="button" onClick={() => addTag('keyw')} className="p-2 bg-blue-600 rounded">
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {keywords.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                            {c}
                            <button onClick={(e) => removecolor(e, 'keyw', i)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            {/* Colors */}
            <div className="mb-4">
                <label className="block text-sm mb-1">Available Colors</label>
                <div className="flex gap-2 mb-2">
                    <input
                        value={tempColor}
                        name="colors"
                        onChange={(e) => setTempColor(e.target.value)}
                        onKeyDown={(e) => handeladd(e, 'color')}
                        type="text"
                        className={`flex-1 p-2 rounded border-1 placeholder-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                        placeholder="e.g. Red"
                    />
                    <button type="button" onClick={() => addTag('color')} className="p-2 bg-blue-600 rounded">
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {colors.map((c, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/50 relative">
                            {c}
                            <button onClick={(e) => removecolor(e, 'color', i)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* Sizes */}
            <div>
                <label className="block text-sm mb-1">Available Sizes</label>
                <div className="flex gap-2 mb-2">
                    <input
                        value={tempSize}
                        name="sizes"
                        onChange={(e) => setTempSize(e.target.value)}
                        onKeyDown={(e) => handeladd(e, 'size')}
                        type="text"
                        className={`flex-1 p-2 rounded border-1 placeholder-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                        placeholder="e.g. XL"
                    />
                    <button type="button" onClick={() => addTag('size')} className="p-2 bg-green-600 rounded">
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/50 relative">
                            {s}
                            <button onClick={(e) => removecolor(e, 'size', i)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
            {/* weights */}
            <div className="mb-4 pt-3">
                <label className="block text-sm mb-1">Weights</label>
                <div className="flex gap-2 mb-2">
                    <input
                        value={tempweight}
                        name="weights"
                        onChange={(e) => setTempweight(e.target.value)}
                        onKeyDown={(e) => handeladd(e, 'weight')}
                        type="text"
                        className={`flex-1 p-2 rounded border-1 placeholder-gray-400 ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-white border-gray-300'}`}
                        placeholder="e.g. Red"
                    />
                    <button type="button" onClick={() => addTag('weight')} className="p-2 bg-blue-600 rounded">
                        <Plus size={20} />
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {weights.map((s, i) => (
                        <span key={i} className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/50 relative">
                            {s}
                            <button onClick={(e) => removecolor(e, 'weight', i)} className="absolute -top-2 -right-2 bg-red-500 rounded-pill p-1">
                                <X size={12} />
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Varients