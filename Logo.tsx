import logoImage from "../../assets/f8c8888aef541c1d625dfd36e103c404aab76974.png";

export function Logo() {
  return (
    <div className="flex items-center">
      <img 
        src={logoImage} 
        alt="HEMFA TECHNOLOGY" 
        className="h-10 w-auto"
      />
    </div>
  );
}