import Navbar from "/components/navbar";
import CategoryMenu from "/components/kategori";
import Photos from "/components/foto";

export default function Home() {
  return (
<>
    <Navbar/>
    <div className="pt-16">  
      <div className="flex flex-row items-start gap-8">
        <div className="w-1/4"> 
          <CategoryMenu /> 
        </div>
        <div className="w-3/4"> 
          <Photos /> 
        </div>
      </div>
    </div>
</>
  );
}
