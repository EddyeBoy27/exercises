const defaultPlants = [
  {
    id: 1,
    breed: "Bromelia",
    needsSun: true,
    origin: "Argentina",
    size: 102,
    specialCare: {
      waterFrequency: 3,
    },
  },
  {
    id: 2,
    breed: "Orquidea",
    size: 99,
    needsSun: false,
    origin: "Brazil",
  },
];

let createdPlants = 0;

const initPlant = ({ id, breed, needsSun, origin, specialCare, size }) => {
  const waterFrequency = needsSun ? size *  0.77 + (origin === 'Brazil' ? 8 : 7)
    : (size / 2) *  1.33 + (origin === 'Brazil' ? 8 : 7);
  const newPlant = {
    id,
    breed,
    needsSun,
    origin,
    specialCare: {
      waterFrequency,
      ...specialCare,
    },
    size,
  };
  return newPlant;
};

const savePlants = () => {
  const plants = JSON.stringify(defaultPlants);
  localStorage.setItem("plants", plants);
};

const getPlants = () => defaultPlants;

const getPlantById = (id) => {
  return defaultPlants.filter((plant) => plant.id === id);
};

const removePlantById = (id) => {
  return defaultPlants.filter((plant) => plant.id !== id);
};

const getPlantsThatNeedsSunWithId = (id) => {
  const filteredPlants = defaultPlants.filter((plant) => {
    if (plant.needsSun && plant.id === id) {
      if (plant.specialCare.waterFrequency > 2) {
        return plant;
      }
    }
  });
  return filteredPlants;
};

const editPlant = (plantId, newPlant) => {
  return defaultPlants.map((plant) => {
    if (plant.id === plantId) {
      return newPlant;
    }
    return plant;
  });
};

const createNewPlant = (plant) => {
  const mappedPlant = initPlant(plant);
  defaultPlants.push(mappedPlant);
  createdPlants++;
  return defaultPlants;
};

module.exports = {
  getPlants,
  getPlantById,
  removePlantById,
  editPlant,
  createNewPlant,
  getPlantsThatNeedsSunWithId,
};