type Category = 'Sport' | 'Cruiser' | 'Touring' | 'Dirt' | 'Adventure' | 'Naked' | 'Electric';

interface Motorcycle {
  id: string;
  name: string;
  manufacturer: string;
  category: Category;
  price: number;
  image_url: string;
  created_at: Date;
  description: string;
  year: number;
}

const fetchMotorcycles= async(): Promise<Motorcycle[]> => {
  const response = await fetch(
    "https://cdn.freecodecamp.org/curriculum/labs/data/motorcycles.json"
  );

  if (!response.ok) {
    throw new Error(`Failed: ${response.status}`);
  }

  const data: Motorcycle[] = await response.json();

  console.log("Datos recibidos:", data);
  console.log("Primera moto:", data[0]);

  return data;
}

const renderMotorcycleCard=(motorcycle: Motorcycle): string => {

  return `<div>
    <img class="motorcycle-card-image-container" src="${motorcycle.image_url}" />
    <span class="motorcycle-card-year-badge">${motorcycle.year}</span>
    <h2 class="motorcycle-card-title">${motorcycle.name}</h2>
    <p class="motorcycle-card-manufacturer">${motorcycle.manufacturer}</p>
    <p class="motorcycle-card-category">${motorcycle.category}</p>
    <p class="motorcycle-card-description">${motorcycle.description}</p>
    <p class="motorcycle-card-price">$${motorcycle.price}</p>
    <p class="motorcycle-card-engine"></p>
  </div>`;
}

class MotorcycleGalleryApp {
  private allMotorcycles: Motorcycle[] = [];

  constructor(motorcycleInput: Motorcycle[] = []) {
    this.allMotorcycles = motorcycleInput;
  }

  renderMotorcycles(filter: string = ""): void {
    const grid = document.getElementById('motorcycle-grid');
    const count = document.getElementById('results-number');

    if(!grid){
    throw new Error("Container was not found");
    };

    let motorcycles=this.allMotorcycles;
    console.log(motorcycles);

    if(!motorcycles || motorcycles.length == 0) return;

    if(filter.trim()){
    motorcycles=this.allMotorcycles.filter(moto=>
      moto.name.toLowerCase().includes(filter.toLowerCase())
    );
    }

    if(count){
    count.innerHTML=String(motorcycles.length);
    }

    grid.innerHTML=motorcycles.map((m)=> renderMotorcycleCard(m)).join("")
}
}


document.addEventListener('DOMContentLoaded', async () => {

    const motorcycles = await fetchMotorcycles();
    const app = new MotorcycleGalleryApp(motorcycles);
    app.renderMotorcycles();


  const input = document.getElementById('name-filter-input') as HTMLInputElement;
   if(input){
   input.addEventListener("input",()=>app.renderMotorcycles(input.value));
   }
});
