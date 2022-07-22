import { motion } from 'framer-motion';
import { AlertTypes } from 'interfaces/frontend/alerts';
import { FiCheck, FiX } from 'react-icons/fi';

interface Props {
  message: string;
  type: AlertTypes;
}
const AlertNotification = ({ message, type }: Props) => (
  <motion.div
    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-60 z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.25 }}
  >
    <motion.div
      className="bg-white flex flex-col justify-center items-center p-20 rounded-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 0.25 } }}
      exit={{ opacity: 0, y: 20 }}
    >
      <span
        className={`bg-gray-200 w-20 h-20 rounded-full  flex items-center justify-center text-9xl ${
          type === AlertTypes.ERROR ? 'text-red-500' : 'text-lime-400'
        }`}
      >
        {type === AlertTypes.ERROR ? <FiX /> : <FiCheck />}
      </span>
      <span className="text-black">{message}</span>
    </motion.div>
  </motion.div>
);
export default AlertNotification;
