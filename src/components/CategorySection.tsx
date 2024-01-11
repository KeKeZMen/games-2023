import { FC, ReactNode } from "react";

type PropsType = {
  videoLink: string;
  title: string;
  children: ReactNode;
};

export const CategorySection: FC<PropsType> = ({
  title,
  videoLink,
  children,
}) => {
  return (
    <section className="relative md:min-h-[calc(100vh-89px)]">
      <div className="h-[calc(100vh-89px)] w-full absolute -z-10 top-0">
        <video autoPlay loop muted className="h-full w-full object-cover">
          <source src={videoLink.toLowerCase()} type="video/mp4" />
        </video>
      </div>

      <div className="w-full z-10 bg-black/70 md:flex md:justify-center md:items-center h-[calc(100vh-89px)]">
        <div className="flex flex-col items-center md:container">
          <h3 className="uppercase w-full text-2xl font-bold text-center my-3">
            Хиты в категории <br /> {title}
          </h3>

          <div className="w-full flex-col gap-3 flex">{children}</div>
        </div>
      </div>
    </section>
  );
};
