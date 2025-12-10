import Image from 'next/image';
import UnderlinedButton from '../ui/UnderlinedButton';
import { toRoman } from '../../lib/strapi';

export default function SchoolPreview({
  previewImage,
  promId,
  schoolId,
}: {
  previewImage: string;
  promId: number;
  schoolId: string;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 max-md:gap-4">
      <Image
        src={previewImage}
        className="h-[360px] w-full rounded-xl object-cover max-md:h-[200px]"
        alt=""
        style={{
          transform: 'translateZ(0)',
          imageRendering: '-webkit-optimize-contrast',
        }}
        width={600}
        height={500}
      />
      <h1 className="font-garamond text-filmo-white text-4xl font-extrabold">
        Promoción {toRoman(Number(promId), schoolId)}
      </h1>
      <UnderlinedButton
        linkTo={`/portafolio/${schoolId}/${promId}`}
        text="ver más"
        styles=''
      />
    </div>
  );
}
