import Image from 'next/image';

export default async function CoverCollage(promPics: any) {

  const pics = promPics.promPics

  function shuffle(array: any[]) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  const shuffledPics = shuffle(pics);

  const ROWS = 4;
  const COLS = 10;
  const TOTAL = ROWS * COLS;

  let picsPool = shuffledPics;

  if (shuffledPics.length < TOTAL) {
    const needed = TOTAL - shuffledPics.length;
    picsPool = [
      ...shuffledPics,
      ...shuffle(shuffledPics).slice(0, needed),
    ];
  }

  picsPool = picsPool.slice(0, TOTAL);

  const rows = Array.from({ length: ROWS }, (_, rowIndex) => {
    const start = rowIndex * COLS;
    return picsPool.slice(start, start + COLS);
  });

  return (
    <div className="flex h-full flex-col gap-4 w-full -rotate-6 fixed z-0 opacity-10">
      {rows.map((row, rIndex) => (
        <div
          key={rIndex}
          className="flex flex-row gap-4  w-full justify-center overflow-hidden-x"
        >
          {row.map((pic: any) => (
            <Image
            key={pic.id}
            src={pic.url}
            alt={pic.url}
            width={500}
            height={300}
            className="rounded-lg h-80 w-auto object-cover"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
