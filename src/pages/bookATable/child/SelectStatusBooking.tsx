import { useEffect, useState } from "react";
import { apiUpdateStatusBooking } from "../../../API/api";
import io from 'socket.io-client';
import { ISelectStatusBooking } from "../../../common/types/bookATable";
const socket = io('http://localhost:3004');

const SelectStatusBooking = ({ text, idBooking }: ISelectStatusBooking) => {
  const selectStatusOptions = [
    { label: 'Chưa xác nhận', value: 'Chưa xác nhận' },
    { label: 'Đã xác nhận', value: 'Đã xác nhận' },
    { label: 'Đã chuẩn bị bàn', value: 'Đã chuẩn bị bàn' },
  ];

  const [showSelectStatus, setShowSelectStatus] = useState<boolean>(false)
  const [selectValue, setSelectValue] = useState<{
    label: string;
    value: string;
  }>()
  console.log("selectValue===>", selectValue);

  const callApiUpdateStatus = async (idBooking: string, newStatus: string) => {
    console.log("newStatus-idBooking", newStatus, idBooking);
    try {
      const res = await apiUpdateStatusBooking(idBooking, newStatus)
      console.log("res-apiUpdateStatusBooking", res);

      setSelectValue({
        label: res.data?.updateBookingStatus.status,
        value: res.data?.updateBookingStatus.status,
      })
    } catch (error) {
      console.log("Error fetching apiUpdateStatusBooking ", error);
    }
  }

  useEffect(() => {
    const handleCloseSelectStatus = () => {
      setShowSelectStatus(false)
    }
    socket.on("updateBookingStatus", (data) => {
      console.log("socket updateBookingStatus", data.updateBookingStatus.status);
      setSelectValue({
        label: data.updateBookingStatus.status,
        value: data.updateBookingStatus.status,
      })

    })

    window.addEventListener("click", handleCloseSelectStatus)
    return () => {
      socket.off('updateBookingStatus');
      window.removeEventListener("click", handleCloseSelectStatus)
    }
  }, [showSelectStatus])

  const getBgColor = () => {
    if (selectValue?.value === "Chưa xác nhận" || text === "Chưa xác nhận") return "bg-red-600";
    if (selectValue?.value === "Đã xác nhận" || text === "Đã xác nhận") return "bg-blue-500";
    if (selectValue?.value === "Đã chuẩn bị bàn" || text === "Đã chuẩn bị bàn") return "bg-green-500";
    return "";
  };


  return <div className="z-[99999]">
    <div onClick={(e) => {
      setShowSelectStatus(!showSelectStatus)
      e.stopPropagation()
    }} className={`${getBgColor()}  w-32 whitespace-nowrap px-2 py-1 rounded-lg cursor-pointer text-white`}>{selectValue?.value ? selectValue.value : text}</div>
    {showSelectStatus &&
      <div className=' absolute top-12 left-4 flex flex-col w-32 border rounded-t-lg rounded-b-lg z-[99999] bg-white '>
        {selectStatusOptions.map((item, index) => (
          <div onClick={(e) => {
            callApiUpdateStatus(idBooking, item.value)
            setSelectValue(item)
            setShowSelectStatus(!showSelectStatus)
            e.stopPropagation()
          }} key={index} className='px-2 py-1 border-b last:border-b-0 first:rounded-t-lg last:rounded-b-lg hover:bg-gray-200 cursor-pointer'>{item.value}</div>
        ))}
      </div>}
  </div>
};

export default SelectStatusBooking;
