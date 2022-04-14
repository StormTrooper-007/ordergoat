import { Table } from "../components/Table";
import { Sidebar } from "../components/Sidebar";
import { Shadow } from "../components/Shadow";
import "../sass/tables.scss";

type Props = {
  setTableNumber: React.Dispatch<React.SetStateAction<number>>;
  off: boolean;
  setOff: React.Dispatch<React.SetStateAction<boolean>>;
  handleSwitch: () => void;
};

export function Tables({ setTableNumber, off, handleSwitch }: Props) {
  const toprow = [301, 302, 303, 304];
  const middlerow = [403, 402, 401];

  const bottomrow = [501, 502, 503];

  return (
    <>
      {off && <Sidebar handleSwitch={handleSwitch} />}
      {off && <Shadow handleSwitch={handleSwitch} />}
      <div className="table__container">
        <h2>Tables</h2>
        <div className="top">
          {toprow.map((t) => (
            <Table key={t} setTableNumber={setTableNumber} t={t} />
          ))}
        </div>
        <div className="middle">
          {middlerow.map((t) => (
            <Table key={t} setTableNumber={setTableNumber} t={t} />
          ))}
        </div>
        <div className="bottom">
          {bottomrow.map((t) => (
            <Table key={t} setTableNumber={setTableNumber} t={t} />
          ))}
        </div>
      </div>
    </>
  );
}
