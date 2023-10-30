import Loadingsvg from "./Loading.svg";
const LoadingIcon = () => {
  return (
    <>
      {/* <p>Loading movies!</p> */}
      <img src={Loadingsvg} alt="Loading image" className="LoadingIcon" />
    </>
  );
};
export default LoadingIcon;
