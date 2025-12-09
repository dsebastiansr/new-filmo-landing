import UnderlinedButton from '../ui/UnderlinedButton';
import Image from 'next/image';

export default function LastWork({
  image,
  prom,
  school,
  link,
  styles,
}: {
  image: string;
  prom: string;
  school: string; 
  link: string;
  styles: string;
}) {
  return (
    <div
      className={`flex w-1/3 flex-col gap-4 ${styles} max-md:w-full max-md:items-center max-md:gap-2`}
    >
      <Image
        src={image}
        alt=""
        className="w-full h-[335px] rounded-xl object-cover"
        width={500}
        height={335}
      />
      <h1 className="text-filmo-white font-garamond text-5xl font-extrabold max-md:text-3xl max-md:text-center">
        Prom {prom}
      </h1>
      <h1 className="text-filmo-white font-garamond text-4xl font-extrabold max-md:text-2xl max-md:text-center">
        {school}
      </h1>

      <UnderlinedButton text="ver más" linkTo={link} styles="" />
    </div>
  );
}
