import Card from "../UI/Card";

import icon from "../../assets/icon.png";

export default function InfoPanel() {
  return (
    <Card className="flex flex-col justify-between items-center gap-5 !h-full !w-full relative z-50">
      <div className="flex items-center justify-center gap-4">
        <img src={icon} alt="App Icon" className="w-12 h-12" />
        <h1 className="text-3xl font-bold">pH&nbsp;Plotter</h1>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className="w-full flex flex-col gap-3">
          <Card className="!w-full flex flex-col items-start !p-3">
            <div className="text-base font-medium">Biuret</div>
            <div className="text-xs text-white/50">
              <div>
                Concentration: 1 mol dm
                <span className="sup">-3</span>
              </div>
            </div>
          </Card>
        </div>

        <p className="text-xs text-center text-white/40">
          Developed by{" "}
          <a
            className="!text-white/40"
            href="https://github.com/HirukaChansilu"
          >
            Hiruka Chansilu
          </a>
        </p>
      </div>
    </Card>
  );
}
