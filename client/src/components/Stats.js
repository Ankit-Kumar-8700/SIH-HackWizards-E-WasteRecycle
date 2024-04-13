import NumberCounter from "number-counter";
import PieChart from "./PieChart";

import {data} from "../constants/index";



const Card = ({img, title, end}) => {
    return (
          <div className="flex flex-col items-center justify-center">
                <img src={img} alt="Cardholder"  className="h-16 w-16"/>
              <div>
                <div className="text-center font-bold text-md">{title}</div>
                <NumberCounter
                  end={end}
                  delay={1}
                  className="increment text-center text-md font-bold text-white bg-darkGreen px-2 py-1 rounded-md"
                  postFix="& more Recycled"
                />
                {/* <div className="text-center text-white bg-darkGreen px-2 py-1 rounded-md">Recycled</div> */}
              </div>
            </div>
    )
}

const Stats = () => {
  return (
    <div className="pt-12 bg-lightBg">
      <h1 className="text-center text-3xl font-bold">
        eWaste Recycled By Us
      </h1>
      <div className="flex flex-col md:flex-row gap-20 justify-center items-center">
        <PieChart />
        <div className="flex flex-wrap gap-4 justify-center">
            {data.map((item) => <Card {...item}  />)}
      </div>
      </div>
    </div>
  );
};
export default Stats;
