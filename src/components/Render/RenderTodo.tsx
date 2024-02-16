import axios from "axios";
import { Button } from "@mui/material";
import { useState, FC } from "react";
import scss from "./render.module.scss";
import { Index } from "../type";
const url = import.meta.env.VITE_BASE_URL;

const RenderTodo: FC<{ todo: Index[]; getReq: () => void }> = ({
  todo,
  getReq,
}) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");

  const [isEdit, setIsEdit] = useState(0);

  const deleteReq = async (id: number) => {
    await axios.delete(`${url}/${id}`);
    getReq();
  };

  const Edit = (item: Index) => {
    setTitle(item.title);
    setImg(item.img);
    setPrice("" + item.price);
    setIsEdit(item._id);
  };

  const updata = async (id: number) => {
    const newData = {
      title,
      img,
      price,
    };
    await axios.patch(`${url}/${id}`, newData);
    setIsEdit(0);
    getReq();
  };

  return (
    <div>
      <div className={scss.mainDiv}>
        {todo.map((item, index) => (
          <div key={index} className={scss.card}>
            {isEdit === item._id ? (
              <div>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={img}
                  onChange={(e) => setImg(e.target.value)}
                />
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                <Button onClick={() => updata(item._id)} variant="outlined">
                  update
                </Button>
                <Button onClick={() => setIsEdit(0)} variant="outlined">
                  cancel
                </Button>
              </div>
            ) : (
              <>
                <h1>{item.title}</h1>
                <img src={item.img} alt="" />
                <p>{item.price}</p>

                <Button onClick={() => deleteReq(item._id)} variant="outlined">
                  delete
                </Button>
                <Button onClick={() => Edit(item)} variant="outlined">
                  edit
                </Button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RenderTodo;
