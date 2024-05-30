import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from 'react-select';
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];
import "react-datepicker/dist/react-datepicker.css";
const BookATable: React.FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    console.log("startDate", startDate);
    const [selectedOption, setSelectedOption] = useState(null);
    return <div className="mt-header w-full flex justify-center">
        <div className="w-3/4 mx-0  ">
            <div className="text-center text-2xl my-5">Book A Table</div>
            <div className="flex justify-between  mb-10">
                <div className="px-4 py-2 bg-black text-white flex items-center space-x-2 w-[250px]">
                    <div>Date</div>
                    <DatePicker className="bg-black outline-none text-center" placeholderText="Choose Date" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className="flex items-center bg-black">
                    <div className="px-4 py-2 bg-black text-white">Total person</div>
                    <input type="number" placeholder="Enter number" className="px-2 w-[150px] text-white outline-none bg-black" />
                </div>
                <div className="px-4 w-[210px] py-2 bg-black text-white flex items-center">
                    <div>select:</div>
                    <Select
                        classNamePrefix="selectStyle"
                        defaultValue={selectedOption}
                        onChange={() => setSelectedOption}
                        options={options}
                    />
                </div>
            </div>
            <div className="grid grid-cols-6 gap-4  text-center">
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>
                <div className="px-4 py-2 border-2 border-black">1:00</div>

            </div>

            <div className="flex justify-center mt-20">
                <div className="px-4 py-2 border-2 border-black w-1/5 text-center">Reservation</div>
            </div>
        </div>

    </div>;
}
export default BookATable;
