import { Card } from "flowbite-react";

const Cards = () => (
  <div>
    <div className="xl:max-w-sm xl:mt-5 xl:float-left max-xl:w-full max-xl:flex max-xl:justify-center mx-2.5 mt-4">
      <Card
        imgSrc="https://thebrobarbershop.pl/wp-content/uploads/2019/02/salon.jpg"
        className="border-neutral-800 max-xl:max-w-sm"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Wiele salonów w Polsce
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Mamy osiem salonów w czterech największych miastach, a kolejne ciągle
          się otwierają
        </p>
      </Card>
    </div>
    <div className="xl:max-w-sm xl:mt-5 xl:float-left max-xl:w-full max-xl:flex max-xl:justify-center mx-2.5 mt-4">
      <Card
        imgSrc="https://d-pa.ppstatic.pl/frames/pa-def/c6/b5/il20220715_726631185_large.jpg"
        className="border-neutral-800  max-xl:max-w-sm"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Profesjonalne salony
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Nasze salony są świetnie wyposażone w najnowszy i najlepszej jakości
          sprzęt
        </p>
      </Card>
    </div>
    <div className="xl:max-w-sm xl:mt-5 xl:float-left max-xl:w-full max-xl:flex max-xl:justify-center mx-2.5 mt-4">
      <Card
        imgSrc="https://www.podlinski.net/wp-content/uploads/2017/10/barber-czy-fryzjer-kto-lepszy.jpg"
        className="border-neutral-800  max-xl:max-w-sm"
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Duży przekrój usług
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Nasi barberzy mają ogromny przekój umiejętności i oferowanych usług
        </p>
      </Card>
    </div>
  </div>
);

export default Cards;