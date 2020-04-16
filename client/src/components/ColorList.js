import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [colorToAdd, setColorToAdd] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addColor = e => {
    setAdding(true);
  }

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth()
    .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res => {
      console.log(res.data);
      updateColors(colors.map(color => 
        color.id === colorToEdit.id ? res.data : color))
        setEditing(false);
        
    })
    .catch(err => console.log("Editing failed!", err))
  };

  const deleteColor = color => {
    axiosWithAuth()
    .delete(`/api/colors/${color.id}`)
    .then(res => {
      // console.log(res.data);
      updateColors(colors.filter(item => 
        item.id !== color.id))
    })
    .catch(err => console.log("Delete failed!", err))
  };

  const saveAdd = e => {
    e.preventDefault();
    axiosWithAuth()
    .post('/api/colors', colorToAdd)
    .then(res => {
      // console.log(res);
      let newColor = res.data[res.data.length-1];
      updateColors([...colors, newColor])
      setColorToAdd(initialColor);
      setAdding(false);
    })
    .catch(err => console.log("Add failed!", err));
  }

  return (
    <div className="colors-wrap">
      <div className='add-header'>
        <p>colors</p>
        <span onClick={addColor}>add</span>
      </div>
      <ul>
        {colors.map(color => (
          <li key={color.color}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              <span onClick={() => editColor(color)}>{color.color}</span>
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {adding && (
      <form onSubmit={saveAdd}>
        <legend>add color</legend>
        <label>
          color name:
          <input
            onChange={e =>
              setColorToAdd({ ...colorToAdd, color: e.target.value })
            }
            value={colorToAdd.color}
          />
        </label>
        <label>
          hex code:
          <input
            onChange={e =>
              setColorToAdd({
                ...colorToAdd,
                code: { hex: e.target.value }
              })
            }
            value={colorToAdd.code.hex}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
          <button onClick={() => setAdding(false)}>cancel</button>
        </div>
      </form>
    )}
    <div className="spacer" />

    </div>
  );
};

export default ColorList;
