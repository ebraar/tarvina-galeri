import Navbar from "/components/navbar";
import CategoryMenu from "/components/kategori";

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex">
      <CategoryMenu/>
    </div>
   </>
  );
}
