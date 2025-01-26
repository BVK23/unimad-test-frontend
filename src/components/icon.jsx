import Image from "next/image";

export const Icon = props => {
  const { name, size = 26, className, ...rest } = props;

  const iconName = `/assets/icons/${name}.svg`;

  return (
    <Image
      {...rest}
      loading="lazy"
      src={iconName}
      alt={name}
      width={size}
      height={size}
      className={className}
    />
  );
};
