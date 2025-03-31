import Card from "./Card";

export default function Table({ data }: { data: number[][] }) {
  return (
    <Card className="overflow-y-scroll h-32 w-full lg:w-32 lg:h-full">
      <div className="absolute top-0 right-0 left-0 w-full p-1">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-white/50">
              <th className="text-[0.6rem] text-white/80">Volume</th>
              <th className="text-[0.6rem] text-white/80 border-l-2 border-white/20">
                pH
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((point, index) => (
              <tr key={index}>
                <td className="text-[0.6rem] text-white/60 py-[0.1rem] w-1/2">
                  {point[0].toFixed(2)}
                </td>
                <td className="text-[0.6rem] text-white/60 py-[0.1rem] w-1/2 border-l-2 border-white/20">
                  {point[1].toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
