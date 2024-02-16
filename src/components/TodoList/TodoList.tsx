import { useState, FC, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import scss from "./todo.module.scss";

import RenderTodo from "../Render/RenderTodo.jsx";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Index } from "../type";
import axios from "axios";

const url = import.meta.env.VITE_BASE_URL;

const TododList: FC = () => {
  const [todoCard, setTodoCard] = useState({
    title: "",
    img: "",
    price: "",
  });

  const [todo, setTodo] = useState<Index[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChamger = (e: any) => {
    const { id, value } = e.target;
    setTodoCard((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const postReq = async () => {
    console.log(todoCard.price);

    if (todoCard.title === "" || todoCard.img === "" || todoCard.price === "") {
      toast.error("fill the field!");
      return null;
    } else {
      const response = (await axios.post(url, todoCard)).data;
      setTodo(response);
      toast.success("success");
      setTodoCard({ title: "", img: "", price: "" });
    }
  };

  const getReq = async () => {
    const response = (await axios.get<Index[]>(url)).data;
    setTodo(response);
  };

  useEffect(() => {
    getReq();
  }, []);

  return (
    <div className={scss.mainDiv}>
      <div className={scss.inputs}>
        <TextField
          id="title"
          label="title"
          variant="outlined"
          value={todoCard.title}
          onChange={handleChamger}
        />

        <TextField
          id="img"
          label="img"
          variant="outlined"
          value={todoCard.img}
          onChange={handleChamger}
        />
        <TextField
          id="price"
          label="price"
          variant="outlined"
          value={todoCard.price}
          onChange={handleChamger}
        />

        <Button onClick={postReq} variant="contained">
          add
        </Button>
        <ToastContainer />
      </div>
      <RenderTodo todo={todo} getReq={getReq} />
    </div>
  );
};

export default TododList;
