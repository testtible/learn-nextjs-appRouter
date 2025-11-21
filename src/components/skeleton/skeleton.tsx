import style from "./skeleton.module.css";

export default function Skeleton() {
  return (
    <div className={style.container}>
      <div className={style.cover_img}></div>
      <div className={style.info_container}>
        <div className={style.title}></div>
        <div className={style.subTitle}></div>
        <br />
        <div className={style.author}></div>
      </div>
    </div>
  );
}

export const SkeletonList = ({ count }: { count: number }) => {
  return new Array(count).fill(0).map((_, index) => <Skeleton key={index} />);
};
