/*
 * Copyright (c) 2023 Ryo-Kgym.
 */

import Link from "next/link";

export type LinkProps = {
  href: string;
  label: string;
  back?: boolean;
  handleClick?: () => void;
};

export const LinkList = ({ props }: { props: LinkProps[] }) => (
  <div className={"space-y-5"}>
    {props.map((p, i) => (
      <Card
        href={p.href}
        label={p.label}
        back={p.back}
        handleClick={p.handleClick}
        key={`link${
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          i
        }`}
      />
    ))}
  </div>
);

// TODO description を追加する
const Card = ({ back, label, href, handleClick }: LinkProps) => {
  const text = back ? <h2>&larr; {label}</h2> : <h2> {label} </h2>;

  return (
    <div className={"rounded-2xl border-2 border-gray-300 shadow hover:border-blue-500"}>
      <Link href={href} onClick={handleClick}>
        <div className={"p-[2em] text-2xl font-bold"}>{text}</div>
      </Link>
    </div>
  );
};
