import ColorModeSwitch from "../components/ColorModeSwitch";
import Movies from "../components/Movies";


console.log(process.env)

function HomePage() {
  return (
    <div>
      <ColorModeSwitch />
       <Movies />
    </div>
  );
}

export default HomePage;
