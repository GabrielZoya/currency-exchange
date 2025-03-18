import styles from "./SwapButton.module.css";

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <button
      className={styles.swapButton}
      onClick={onClick}
      title="Swap currencies"
    >
      <img src="/icons/Button.svg" alt="Swap Icon" width={42} height={42} />
    </button>
  );
};

export default SwapButton;
