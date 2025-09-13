import { Billboard as BillboardType } from '@/types'

interface BillboardProps {
  data: BillboardType
}

export const Billboard: React.FC<BillboardProps> = ({
     data
     }) => {
  if (!data) {
    console.log('Billboard: No data provided');
    return null;
  }

  console.log('Billboard data:', {
    id: data.id,
    label: data.label,
    hasImageUrl: !!data.imageUrl,
    imageUrlLength: data.imageUrl?.length || 0,
    imageStart: data.imageUrl?.substring(0, 50)
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: data?.imageUrl ? `url("${data.imageUrl}")` : 'none',
        }}
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs text-white drop-shadow-lg">
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billboard;