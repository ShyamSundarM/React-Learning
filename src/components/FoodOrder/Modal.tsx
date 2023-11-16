import { PropsWithChildren } from "react";
import styles from "./Modal.module.css";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Modal(props: PropsWithChildren<Props>) {
  return (
    <AnimatePresence>
      {props.modalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          onClick={() => props.setModalOpen(false)}
          className={styles.background}
        >
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            {props.children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
