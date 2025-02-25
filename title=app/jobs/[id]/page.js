import { FaMoneyBillWave, FaCalendarAlt } from 'react-icons/fa';

<div className="flex flex-col gap-2">
  <div className="flex items-center text-xl font-semibold text-blue-600">
    <FaMoneyBillWave className="mr-2 text-blue-600" />
    <span>Pay: £{job.price}</span>
  </div>
  <div className="flex items-center text-xl font-semibold text-blue-600">
    <FaCalendarAlt className="mr-2 text-blue-600" />
    <span>Frequency: Weekly</span>
  </div>
</div> 