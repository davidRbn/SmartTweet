import exemplePosteImage from "../../assets/exemplePost.png";

const SectionTitle = () => {
  return (
    <div className="m-auto text-center mt-10 max-w-4xl ">
      <h1 className="text-5xl font-extrabold text-gray-800 mx-2  ">
        Discover a new way to tweet powered by artificial intelligence
      </h1>
      <span className="text-m text-gray-500">
        {" "}
        Your next memorable tweet is just a click away
      </span>

      <img
        src={exemplePosteImage}
        alt="postImage"
        className="rounded-lg shadow-lg border border-gray-200 mt-10"
      />
    </div>
  );
};

export default SectionTitle;
