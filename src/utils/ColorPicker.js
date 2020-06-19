import React from 'react';
import { SketchPicker } from 'react-color';

export default function ColorPicker({color, setColor, showColorPicker, setShowColorPicker, isBackgroundColor=false}) {
    
    // Ejemplo de implementacion en el componente padre
    /*
    import ColorPicker from '../utils/ColorPicker';
    ...
    const [color, setColor] = useState("white");
    const [showColorPicker, setShowColorPicker] = useState(false);
    
    return(
        {showColorPicker && (
            <ColorPicker
                color={color}
                setColor={setColor}
                showColorPicker={showColorPicker}
                setShowColorPicker={setShowColorPicker}
                isBackgroundColor={true}
            />
        )}
    )

    */

    return (
        <div
            style={{
                position: 'relative',
                display:'flex',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: isBackgroundColor && (color),
                padding:'10px',
                borderRadius:'2px',
                margin:'0 1px',
                }}
        >
            <div
                style={{
                    position: 'absolute',
                    width:'100%',
                    height:'100%',marginTop: '10px',      
                }}
                onClick={()=>setShowColorPicker( showColorPicker => !showColorPicker)}
            />
            
            <SketchPicker 
                color={color}
                onChange={ updatedColor => setColor( updatedColor.hex) }
            />
            
        </div>
    )
}
