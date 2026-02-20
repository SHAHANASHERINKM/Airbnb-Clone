import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function FilterModel({closeModel,applyFilter}) {
    const [location, setLocation] = useState("");
    
    const [minPrice,setMinPrice]=useState("");
    const [maxPrice,setMaxPrice]=useState("");
    const [guests,setGuests]=useState("");
    const [propertyType,setPropertyType]=useState("house");

    const handleApply=()=>{
        const filters={
            minPrice,
            maxPrice,
            guests,
            propertyType,
            location
        }
        applyFilter(filters);
        closeModel(false);

    };

    return (

        <div className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center ">

            <div className="bg-white p-5 w-11/12 md:w-1/2 rounded-xl flex flex-col gap-4 relative ">
                <button
                    onClick={() => closeModel(false)}
                    className="absolute top-3 right-3 text-xl "
                >
                    ✕
                </button>

                <h2 className="text-lg font-bold text-center">Filter</h2>
                <hr />

                 <div className="flex flex-col gap-2">
                    <span className="font-medium">Location</span>
                    <input type="text" placeholder="Where are you going?" className="border p-2 rounded w-full outline-none focus:border-secondary" value={location} onChange={(e)=>{setLocation(e.target.value)}}/>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Price Range</span>
                    <div className="flex gap-2">
                        <input type="number" placeholder="Min price" className="border p-2 rounded w-full outline-none focus:border-secondary" value={minPrice} onChange={(e)=>{setMinPrice(e.target.valueAsNumber)}}/>
                        <input type="number" placeholder="Max price" className="border p-2 rounded w-full outline-none focus:border-secondary" value={maxPrice} onChange={(e)=>{setMaxPrice(e.target.valueAsNumber)}} />
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Guests</span>
                    <input type="number" placeholder="Guests" className="border p-2 rounded w-full outline-none focus:border-secondary" value={guests} onChange={(e)=>{setGuests(e.target.valueAsNumber)}}/>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="font-medium">Property Type</span>
                    <select className="border p-2 rounded w-full outline-none focus:border-secondary" value={propertyType} onChange={(e)=>{setPropertyType(e.target.value)}}>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="villa">Villa</option>
                        <option value="hotel">Hotel</option>
                    </select>
                </div>

                <div className="flex justify-end mt-4">
                    <button className="bg-primary rounded-md px-4 py-2 hover:bg-secondary text-white shadow transition"
                    onClick={handleApply}
                    >Show Result</button>
                </div>

            </div>
        </div>
    )
}
