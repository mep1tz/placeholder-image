import './index.css';
import { useState } from 'react';
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";

function App() {
  const [color, setColor] = useColor("black");
    const [height, setHeight] = useState(100);
    const [width, setWidth] = useState(100);

    const [imageUrl, setImageUrl] = useState('');
    const red=color.rgb.r, blue=color.rgb.b, green=color.rgb.g;
    //  alpha=color.hsv.v*2.55; 

    const createImage = () =>{
        console.log("Hiiii");
        fetch(`/api?red=${red}&green=${green}&blue=${blue}&h=${height}&w=${width}`)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          setImageUrl(url);
        })
        .catch(error => console.error('Error:', error));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        console.log("Hi");
        // const imageUrl = `data:image/jpeg;base64,${response.data}`; // Update the imageUrl state with the response
        // setImageUrl(imageUrl);
        
    }
  return (
    <div className="flex min-h-screen flex-col mx-48 my-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">  
            <input className="text-black rounded-md" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="Height" />
            <input className="text-black rounded-md" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="Width" />
            <ColorPicker color={color} onChange={setColor} /> {/* Use ColorPicker instead of input */}
            <button className="bg-blue-300 h-10 rounded-md" type="submit" onClick={createImage}>Submit</button>
        </form>  
        <h1>
          Height = {height},
          Width = {width},
          Red = {red},
          blue = {blue},
          green = {green},
        </h1>
        {imageUrl && <img src={imageUrl} width={width} height={height} alt="Generated" />}
    </div>
)
}

export default App;
