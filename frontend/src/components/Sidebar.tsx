import "../sass/sidebar.scss";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {
  handleSwitch: () => void;
};

export function Sidebar({ handleSwitch }: Props) {
  const navigate = useNavigate();
  return (
    <motion.div
      animate={{ x: [-450, 1] }}
      initial={true}
      transition={{ ease: "easeOut", duration: 2 }}
      className="sidebar"
    >
      <ul>
        <li>Food</li>
        <li>Drinks</li>
        <li>Salad</li>
        <li 
          onClick={() => {
          navigate("/myorders");
          handleSwitch();
        }}
        >
          My Orders
        </li>
        <li
          onClick={() => {
            navigate("/tables");
            handleSwitch();
          }}
        >
          Tables
        </li>
        <li
          onClick={() => {
            navigate("/admin");
            handleSwitch();
          }}
        >
          Admin
        </li>
      </ul>
    </motion.div>
  );
}
