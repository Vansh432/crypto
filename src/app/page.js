"use client"; // Ensure this component is treated as a client component
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Component/Navbar";
import { FaSearch, FaBuilding } from 'react-icons/fa';

export default function App() {
  const [exchangesName, setExchangeName] = useState([]);
  const [exchangeItemsLimit, setExchangeItemsLimit] = useState([]);
  const [value, setValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const itemsPerPage = 10; // Items per page
  const pagesToShow = 3; // Number of page numbers to show

  const ApiKey = 'be712b61-e9db-43ba-aaae-94034284941e'; // API key of coinAPI
  const URL1 = `https://rest.coinapi.io/v1/exchanges?apikey=${ApiKey}`; // routes of coinAPI
  const URL2 = `https://rest.coinapi.io/v1/exchanges/icons/32?apikey=${ApiKey}`; // routes of coinAPI icon

  useEffect(() => {

    //get data from api endpoint
    async function getData() {
      const [response1, response2] = await Promise.all([axios.get(URL1), axios.get(URL2)]);
      const exchanges = response1.data;
      const iconexchange = response2.data;

      const mergeArray = exchanges.map(element => {
        const icon = iconexchange.find(icon => icon.exchange_id === element.exchange_id);
        return {
          name: element.exchange_id,
          url: icon ? icon.url : "No icon available",
          volume_1day_usd: element.volume_1day_usd
        };
      });

      setExchangeName(mergeArray);
      setExchangeItemsLimit(mergeArray);
    }

    getData();
  }, []);

  //this useEffect call the when user enter the input and search crypto exchange
  useEffect(() => {
    const filterArr = exchangesName.filter((element) => {
      const volumeString = element.volume_1day_usd.toString(); // Convert volume to string for comparison
      return element.name.toLowerCase().startsWith(value.toLowerCase()) ||
        volumeString.startsWith(value); // Filter by name or volume
    });

    setCurrentPage(1); // Reset to the first page when filtering
    setExchangeItemsLimit(filterArr);
  }, [value]);

  const totalPages = Math.ceil(exchangeItemsLimit.length / itemsPerPage); // Total pages
  const currentItems = exchangeItemsLimit.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage); // Items for current page

  const handleNextClick = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Calculate the range of pages to display
  const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2)); // Start page
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1); // End page

  const handlePageClick = (page) => {
    setCurrentPage(page); // Update current page
  };

  return (
    <>
      <Navbar />
      <div className="relative flex m-auto mt-[50px] w-[30%] max-sm:w-[90%]">
        <FaBuilding className="absolute left-[15px] text-[1.2rem] top-[32%]" />
        <input
          type="text"
          placeholder="Search by name or volume"
          className="h-[50px] w-[100%] border-2 pl-[40px] focus:outline-[#0083ff] border-[#0083ff] rounded-[40px]"
          onChange={(e) => setValue(e.target.value)} // Update value on input change
        />
        <FaSearch className="absolute right-[20px] text-[1.2rem] top-[37%]" />
      </div>
      <div className="mt-[50px]">
        <div className="flex border-b-2 justify-evenly max-sm:justify-between px-[10px]">
          <h2 className="font-bold">EXCHANGES</h2>
          <h2 className="font-bold">24 TRADE VOLUME</h2>
        </div>
        {currentItems.map((element, index) => (
          <div className="border-b-2 py-[15px]" key={index}>
            <div className="flex justify-between w-[43%] m-auto max-sm:w-[90%]">
              <div className="flex">
                <span className="mr-[10px]">{(currentPage - 1) * itemsPerPage + index + 1}</span>
                <img src={element.url} alt="" />
                <h3>{element.name}</h3>
              </div>
              <div>{element.volume_1day_usd}</div>
            </div>
          </div>
        ))}

        <div className="flex justify-center mt-[20px]">
          <button
            onClick={handlePreviousClick}
            disabled={currentPage === 1}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border rounded-full hover:bg-blue-50 transition duration-[0.4s] hover:border-[#3B82F6] border-[2px]`}
          >
            &lt; Previous
          </button>
          <div>
            {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
              <button
                key={startPage + index}
                onClick={() => handlePageClick(startPage + index)}
                className={`mx-1 px-3 py-1 border rounded ${currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-white text-blue-600'}`}
              >
                {startPage + index}
              </button>
            ))}
          </div>
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 bg-white border rounded-full hover:bg-blue-50 transition duration-[0.4s] hover:border-[#3B82F6] border-[2px]`}
          >
            Next &gt;
          </button>
        </div>
      </div>
    </>
  );
}
