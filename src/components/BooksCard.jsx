import React from 'react';

const BooksCard = ({ book }) => {
    const { 
        title, 
        genre, 
        price, 
        coverImageUrl, 
        shortDescription, 
        userName, 
        status 
    } = book;

    return (
        <div className="bg-[#121212] text-white rounded-lg overflow-hidden border border-gray-800 flex flex-col justify-between h-full shadow-lg">
            <div>
                {/* Book Cover Image */}
                <div className="w-full h-64 overflow-hidden bg-gray-900">
                    <img 
                        src={coverImageUrl || "https://via.placeholder.com/150"} 
                        alt={title} 
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Book Details */}
                <div className="p-4 space-y-2">
                    <h3 className="text-lg font-bold line-clamp-1">{title}</h3>
                    <p className="text-xs text-gray-400">by {userName || 'Unknown'}</p>
                    <p className="text-sm text-gray-300 line-clamp-2 h-10">{shortDescription}</p>
                    
                    {/* Genre & Price */}
                    <div className="flex items-center justify-between pt-2">
                        <span className="bg-gray-800 text-xs px-2.5 py-1 rounded font-medium">
                            {genre}
                        </span>
                        <span className="text-base font-bold">${price}</span>
                    </div>

                    {/* Sales & Status */}
                    <div className="pt-2 text-xs text-gray-500 space-y-1">
                        {status === 'published' && (
                            <span className="inline-block bg-[#1e3a2f] text-[#4ade80] text-[11px] px-2 py-0.5 rounded font-semibold capitalize">
                                {status}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <div className="p-4 pt-0">
                <button className="w-full bg-[#0a0a0a] hover:bg-gray-900 border border-gray-800 text-white text-sm font-medium py-2 rounded transition-colors duration-200">
                    View Details
                </button>
            </div>
        </div>
    );
};

export default BooksCard;