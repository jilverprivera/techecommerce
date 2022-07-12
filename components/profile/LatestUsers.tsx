import {BsArrowRight} from 'react-icons/bs';

const LatestUsers = () => {
  return (
    <div className="w-full bg-white rounded-md p-3 shadow-md">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-supremeMedium">Latest users</h3>
        <button className="border-2 rounded-md h-10 w-10 flex items-center justify-center bg-orange-500 text-white text-xl">
          <BsArrowRight />
        </button>
      </div>
    </div>
  );
};

export default LatestUsers;
