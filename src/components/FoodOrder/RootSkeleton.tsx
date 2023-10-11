import styles from "./RootSkeleton.module.css";
import itemStyles from "./FoodItem.module.css";
import { Skeleton } from "@mui/material";

const RootSkeleton = () => {
  const temp = [1, 2, 3];
  return (
    <div className={styles.container}>
      {temp.map((food) => {
        return <FoodItemSkeleton key={food} />;
      })}
    </div>
  );
};

export default RootSkeleton;

function FoodItemSkeleton() {
  return (
    <div className={itemStyles.container}>
      <div className={itemStyles.innerContainer}>
        <Skeleton
          className={itemStyles.image}
          width={150}
          height={150}
          animation="wave"
          variant="rounded"
        />
        <div className={itemStyles.details}>
          <Skeleton
            className={itemStyles.name}
            width={450}
            animation="wave"
            variant="text"
          />
          <Skeleton
            className={itemStyles.price}
            width={350}
            animation="wave"
            variant="text"
          />
        </div>
      </div>
      <div className={itemStyles.counter}>
        <Skeleton animation="wave" variant="text" width={50} />
      </div>
    </div>
  );
}
