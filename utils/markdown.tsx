export const CustomH2 = ({ node, ...props }: any) => (
  <h2 className="text-xl font-bold my-1 text-main" {...props} />
);
export const customH3 = ({ node, ...props }: any) => (
  <h3 className=" text-lg font-semibold py-3" {...props} />
);
export const customOL = ({ node, ...props }: any) => (
  <ol className=" list-decimal text-base px-5 py-1" {...props} />
);
export const customP = ({ node, ...props }: any) => (
  <p className="text-[#3E3E3E] text-base text-justify py-1" {...props} />
);
export const customUL = ({ node, ...props }: any) => (
  <ul className=" list-disc text-base px-2 py-1" {...props} />
);
export const customTH = ({ node, ...props }: any) => (
  <th className="bg-main text-white text-lg p-2 text-left" {...props} />
);
export const customTD = ({ node, ...props }: any) => (
  <td className="border border-black p-2" {...props} />
);
export const strong = ({ node, ...props }: any) => (
  <strong className=" font-normal" {...props} />
);
export const code = ({ node, ...props }: any) => (
  <code className="text-white bg-main px-2 py-1 m-1" {...props} />
);
export const customLink = ({ node, ...props }: any) => (
  <a
    target="_blank"
    className="text-main font-semibold cursor-pointer italic"
    {...props}
  />
);
