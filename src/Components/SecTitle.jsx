const SecTitle = ({ headding, subHeadding }) => {
  return (
    <div className="md:w-4/12 mx-auto text-center my-8">
      <p className="text-accent mb-2">---{subHeadding}---</p>
      <h2 className="text-3xl border-y-4 uppercase py-4">{headding}</h2>
    </div>
  );
};

export default SecTitle;
