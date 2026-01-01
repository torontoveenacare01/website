import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Storefront from './Storefront';

export const metadata = {
  title: "Toronto Veena Care | Instruments & Services",
  description: "Specializing in Veena sales, restoration, and musical services in Toronto.",
};

async function getProducts() {
  try {
    // Read the YAML file from the root directory or data folder
    const filePath = path.join(process.cwd(), 'products.yaml');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = yaml.load(fileContents);
    return data;
  } catch (e) {
    console.error("Error reading YAML file:", e);
    return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      <Storefront products={products} />
    </main>
  );
}